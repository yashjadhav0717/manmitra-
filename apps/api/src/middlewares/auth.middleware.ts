import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole, AuthUser } from '@manmitra/shared';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
import { UnauthorizedError, ForbiddenError } from '../utils/response.js';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      sessionId?: string;
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    let token = req.cookies?.manmitra_token;

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Authentication required. Please log in.');
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;

    // Check if session is valid in database
    const session = await prisma.session.findUnique({
      where: { id: decoded.sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedError('Session expired or revoked. Please log in again.');
    }

    const { user } = session;
    req.user = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role as UserRole,
      preferredLang: user.preferredLang,
      isEmailVerified: user.isEmailVerified,
    };
    req.sessionId = session.id;

    next();
  } catch (error) {
    next(error);
  }
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  authenticate(req, res, (err) => {
    // If auth fails in optional mode, simply proceed without req.user
    next();
  });
}

export function requireRole(...allowedRoles: (UserRole | string)[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          `Access restricted: Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}`
        )
      );
    }

    next();
  };
}
