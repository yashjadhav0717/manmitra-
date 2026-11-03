import { Request, Response, NextFunction } from 'express';
import { RegisterInput, LoginInput } from '@manmitra/shared';
import { AuthService } from '../services/auth.service.js';
import { sendSuccess, sendCreated } from '../utils/response.js';
import { env } from '../config/env.js';

const COOKIE_NAME = 'manmitra_token';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function setAuthCookie(res: Response, token: string) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SEVEN_DAYS_MS,
    path: '/',
  });
}

function clearAuthCookie(res: Response) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body as RegisterInput;
      const ip = req.ip || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const result = await AuthService.register(input, ip, userAgent);
      setAuthCookie(res, result.token);

      return sendCreated(
        res,
        {
          user: result.user,
          token: result.token,
        },
        'Registration successful. Welcome to ManMitra (मनमित्र).'
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body as LoginInput;
      const ip = req.ip || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const result = await AuthService.login(input, ip, userAgent);
      setAuthCookie(res, result.token);

      return sendSuccess(
        res,
        {
          user: result.user,
          token: result.token,
        },
        'Login successful.'
      );
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout(req.sessionId, req.user?.id);
      clearAuthCookie(res);

      return sendSuccess(res, null, 'Logged out successfully.');
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.getCurrentUser(req.user!.id);
      return sendSuccess(res, { user });
    } catch (error) {
      next(error);
    }
  }
}
