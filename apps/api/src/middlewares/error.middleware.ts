import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError, sendError } from '../utils/response.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  logger.error(`Error processing ${req.method} ${req.url}: ${err.message}`, {
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // 1. Handled Operational Application Errors
  if (err instanceof AppError) {
    return sendError(res, err.code, err.message, err.statusCode, err.details);
  }

  // 2. Zod Validation Errors
  if (err instanceof ZodError) {
    const formatted = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return sendError(res, 'VALIDATION_ERROR', 'Request validation failed', 422, formatted);
  }

  // 3. Prisma Database Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') || 'field';
      return sendError(res, 'CONFLICT', `A record with this ${target} already exists`, 409);
    }
    if (err.code === 'P2025') {
      return sendError(res, 'NOT_FOUND', 'Record not found in database', 404);
    }
    return sendError(res, 'DATABASE_ERROR', 'A database operation error occurred', 500);
  }

  // 4. JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'UNAUTHORIZED', 'Invalid authentication token', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'UNAUTHORIZED', 'Authentication token has expired', 401);
  }

  // 5. Unhandled Server Errors
  const message =
    env.NODE_ENV === 'production'
      ? 'An unexpected internal server error occurred'
      : err.message || 'Internal server error';

  return sendError(res, 'INTERNAL_SERVER_ERROR', message, 500);
}

export function notFoundHandler(req: Request, res: Response) {
  return sendError(
    res,
    'NOT_FOUND',
    `Resource not found: ${req.method} ${req.originalUrl}`,
    404
  );
}
