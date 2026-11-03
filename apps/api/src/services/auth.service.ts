import argon2 from 'argon2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { RegisterInput, LoginInput, AuthUser, UserRole } from '@manmitra/shared';
import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';
import { ConflictError, UnauthorizedError, NotFoundError } from '../utils/response.js';
import { logger } from '../utils/logger.js';
import { TokenPayload } from '../middlewares/auth.middleware.js';

const SESSION_DURATION_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64 MB
    timeCost: 3,
    parallelism: 1,
  });
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    if (hash.startsWith('$argon2')) {
      return await argon2.verify(hash, password);
    }
    // Fallback for bcrypt hashed seed data
    if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
      return await bcrypt.compare(password, hash);
    }
    return false;
  } catch (error) {
    logger.error('Password verification error', { error });
    return false;
  }
}

function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: `${SESSION_DURATION_DAYS}d`,
  });
}

export class AuthService {
  static async register(input: RegisterInput, ipAddress?: string, userAgent?: string) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase().trim() },
    });

    if (existing) {
      throw new ConflictError('An account with this email address already exists.');
    }

    const passwordHash = await hashPassword(input.password);
    const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create User
      const user = await tx.user.create({
        data: {
          email: input.email.toLowerCase().trim(),
          passwordHash,
          fullName: input.fullName.trim(),
          phone: input.phone?.trim() || null,
          role: UserRole.CUSTOMER,
          preferredLang: input.preferredLang || 'mr',
          isEmailVerified: false,
          profile: {
            create: {
              displayName: input.fullName.trim().split(' ')[0],
            },
          },
          consents: {
            create: [
              {
                consentType: 'TERMS',
                granted: true,
                ipAddress,
                userAgent,
              },
              {
                consentType: 'PRIVACY',
                granted: true,
                ipAddress,
                userAgent,
              },
            ],
          },
        },
      });

      // 2. Create Session
      const tokenHash = crypto.randomBytes(32).toString('hex');
      const session = await tx.session.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
          ipAddress,
          userAgent,
        },
      });

      // 3. Audit Log
      await tx.auditLog.create({
        data: {
          actorId: user.id,
          action: 'USER_REGISTERED',
          resource: 'User',
          resourceId: user.id,
          details: JSON.stringify({ email: user.email }),
          ipAddress,
        },
      });

      return { user, session };
    });

    const authUser: AuthUser = {
      id: result.user.id,
      email: result.user.email,
      fullName: result.user.fullName,
      phone: result.user.phone,
      role: result.user.role as UserRole,
      preferredLang: result.user.preferredLang,
      isEmailVerified: result.user.isEmailVerified,
    };

    const token = generateToken({
      userId: authUser.id,
      email: authUser.email,
      role: authUser.role,
      sessionId: result.session.id,
    });

    logger.info(`User registered successfully: ${authUser.email} [${authUser.id}]`);

    return { user: authUser, token, expiresAt };
  }

  static async login(input: LoginInput, ipAddress?: string, userAgent?: string) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase().trim() },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const isValidPassword = await verifyPassword(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);
    const tokenHash = crypto.randomBytes(32).toString('hex');

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: user.id,
        action: 'USER_LOGIN',
        resource: 'User',
        resourceId: user.id,
        ipAddress,
      },
    });

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role as UserRole,
      preferredLang: user.preferredLang,
      isEmailVerified: user.isEmailVerified,
    };

    const token = generateToken({
      userId: authUser.id,
      email: authUser.email,
      role: authUser.role,
      sessionId: session.id,
    });

    logger.info(`User logged in: ${authUser.email} (${authUser.role})`);

    return { user: authUser, token, expiresAt };
  }

  static async logout(sessionId?: string, actorId?: string) {
    if (sessionId) {
      await prisma.session.deleteMany({
        where: { id: sessionId },
      });
    }

    if (actorId) {
      await prisma.auditLog.create({
        data: {
          actorId,
          action: 'USER_LOGOUT',
          resource: 'Session',
          resourceId: sessionId,
        },
      });
    }
  }

  static async getCurrentUser(userId: string): Promise<AuthUser> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundError('User profile not found');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role as UserRole,
      preferredLang: user.preferredLang,
      isEmailVerified: user.isEmailVerified,
    };
  }
}
