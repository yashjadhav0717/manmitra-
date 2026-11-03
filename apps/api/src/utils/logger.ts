import { env } from '../config/env.js';

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'audit';

function formatLog(level: LogLevel, message: string, meta?: any) {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
}

export const logger = {
  info: (message: string, meta?: any) => {
    console.log(formatLog('info', message, meta));
  },
  warn: (message: string, meta?: any) => {
    console.warn(formatLog('warn', message, meta));
  },
  error: (message: string, meta?: any) => {
    console.error(formatLog('error', message, meta));
  },
  debug: (message: string, meta?: any) => {
    if (env.NODE_ENV !== 'production') {
      console.debug(formatLog('debug', message, meta));
    }
  },
  audit: (action: string, actorId?: string, details?: any) => {
    console.log(
      formatLog('audit', `ACTION: ${action}`, {
        actorId: actorId || 'SYSTEM',
        details,
      })
    );
  },
};

export default logger;
