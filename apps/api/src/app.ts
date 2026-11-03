import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { env } from './config/env.js';
import { standardRateLimiter } from './middlewares/rateLimit.middleware.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';
import { sendSuccess } from './utils/response.js';
import authRouter from './routes/auth.routes.js';

export function createApp(): Express {
  const app = express();

  // 1. Trust proxy for rate limiting behind reverse proxies
  app.set('trust proxy', 1);

  // 2. Security Headers & CORS
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  const allowedOrigins = [
    env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
  ].filter(Boolean);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, postman)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, true); // Dev-friendly permissive for local testing
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // 3. Body Parsing & Cookies
  app.use(cookieParser());
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));

  // 4. Request Logging
  if (env.NODE_ENV !== 'test') {
    app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
  }

  // 5. Global Rate Limiter
  app.use(standardRateLimiter);

  // 6. Health & Status Endpoints
  const healthCheck = (_req: Request, res: Response) => {
    return sendSuccess(res, {
      status: 'healthy',
      app: 'ManMitra API',
      version: '1.0.0',
      environment: env.NODE_ENV,
      tagline: 'तुमचं मन. तुमच्या भावना. आमची साथ.',
      englishTagline: "You Don't Always Need Answers. Sometimes, You Just Need to Be Heard.",
      timestamp: new Date().toISOString(),
    });
  };

  app.get('/health', healthCheck);
  app.get('/api/v1/health', healthCheck);

  // 7. API Routes (/api/v1)
  app.use('/api/v1/auth', authRouter);

  // 8. 404 & Global Error Handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp;
