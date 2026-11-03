import { Router } from 'express';
import { RegisterSchema, LoginSchema } from '@manmitra/shared';
import { AuthController } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import { authRateLimiter } from '../middlewares/rateLimit.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post('/register', authRateLimiter, validateBody(RegisterSchema), AuthController.register);
authRouter.post('/login', authRateLimiter, validateBody(LoginSchema), AuthController.login);
authRouter.post('/logout', authenticate, AuthController.logout);
authRouter.get('/me', authenticate, AuthController.me);

export default authRouter;
