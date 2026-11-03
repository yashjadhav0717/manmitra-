import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { sendError } from '../utils/response.js';

export function validateBody(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return sendError(res, 'VALIDATION_ERROR', 'Validation failed', 422, formatted);
      }
      next(error);
    }
  };
}

export function validateQuery(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formatted = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return sendError(res, 'VALIDATION_ERROR', 'Query validation failed', 422, formatted);
      }
      next(error);
    }
  };
}
