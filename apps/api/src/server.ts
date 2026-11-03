import { createApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { prisma } from './config/prisma.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info(`✨ ManMitra API Server running on http://localhost:${env.PORT}`);
  logger.info(`🌱 Environment: ${env.NODE_ENV}`);
  logger.info(`🛡️ AI Provider configured: ${env.AI_PROVIDER}`);
  logger.info(`🌐 Allowed Frontend: ${env.FRONTEND_URL}`);
});

// Graceful Shutdown Handlers
async function gracefulShutdown(signal: string) {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);

  server.close(async () => {
    logger.info('HTTP server closed.');
    try {
      await prisma.$disconnect();
      logger.info('Prisma database client disconnected.');
      process.exit(0);
    } catch (err) {
      logger.error('Error during database disconnection:', err);
      process.exit(1);
    }
  });

  // Force close if graceful shutdown hangs
  setTimeout(() => {
    logger.error('Forced shutdown due to timeout.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default server;
