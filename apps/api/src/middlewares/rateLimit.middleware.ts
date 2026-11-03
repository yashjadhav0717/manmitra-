import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/response.js';

export const standardRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(
      res,
      'RATE_LIMIT_EXCEEDED',
      'Too many requests from this IP, please try again in a few minutes',
      429
    );
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(
      res,
      'AUTH_RATE_LIMIT_EXCEEDED',
      'Too many authentication attempts. For security, please wait 15 minutes before trying again.',
      429
    );
  },
});

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(
      res,
      'AI_RATE_LIMIT_EXCEEDED',
      'AI request rate limit reached. Please pause for a moment to reflect before continuing.',
      429
    );
  },
});
