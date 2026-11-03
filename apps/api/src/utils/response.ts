import { Response } from 'express';
import { ApiResponse } from '@manmitra/shared';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: any;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400, code = 'BAD_REQUEST', details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request', details?: any) {
    super(message, 400, 'BAD_REQUEST', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', details?: any) {
    super(message, 401, 'UNAUTHORIZED', details);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden: Insufficient permissions', details?: any) {
    super(message, 403, 'FORBIDDEN', details);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: any) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict detected', details?: any) {
    super(message, 409, 'CONFLICT', details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: any) {
    super(message, 422, 'VALIDATION_ERROR', details);
  }
}

export function sendSuccess<T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode = 200
): Response<ApiResponse<T>> {
  const payload: ApiResponse<T> = {
    success: true,
    ...(data !== undefined && { data }),
    ...(message && { message }),
  };
  return res.status(statusCode).json(payload);
}

export function sendCreated<T>(
  res: Response,
  data?: T,
  message = 'Resource created successfully'
): Response<ApiResponse<T>> {
  return sendSuccess(res, data, message, 201);
}

export function sendError(
  res: Response,
  code: string,
  message: string,
  statusCode = 400,
  details?: any
): Response<ApiResponse> {
  const payload: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined && { details }),
    },
  };
  return res.status(statusCode).json(payload);
}
