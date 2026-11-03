import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load .env from workspace root or current directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  BACKEND_URL: z.string().default('http://localhost:5000'),
  DATABASE_URL: z.string().default('file:./dev.db'),
  JWT_SECRET: z.string().min(16).default('manmitra-dev-jwt-secret-at-least-32-chars-long'),
  SESSION_SECRET: z.string().min(16).default('manmitra-dev-session-secret-salt-key-long'),
  COOKIE_DOMAIN: z.string().default('localhost'),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  AI_PROVIDER: z.enum(['gemini', 'openai', 'mock']).default('mock'),
  AI_PROVIDER_API_KEY: z.string().default(''),
  AI_MODEL: z.string().default('gemini-2.0-flash'),
  AI_DAILY_BUDGET_PAISE: z.coerce.number().default(50000),
  RAZORPAY_KEY_ID: z.string().default('rzp_test_placeholder'),
  RAZORPAY_KEY_SECRET: z.string().default('rzp_secret_placeholder'),
  RAZORPAY_WEBHOOK_SECRET: z.string().default(''),
  REDIS_URL: z.string().optional().default(''),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables. Please check your .env configuration.');
}

export const env = parsedEnv.data;
export type Env = z.infer<typeof envSchema>;
