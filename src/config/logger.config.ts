import { Params } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';
import env from './env.config';

export const pinoLoggerConfig: Params = {
  pinoHttp: {
    genReqId: () => {
      return uuid();
    },
    level: env().isProduction ? 'info' : 'debug',
    formatters: {
      level: (label) => ({ level: label }),
    },
    prettyPrint: env().isDevelopment
      ? { translateTime: true, colorize: true }
      : false,
    redact: [
      "req.headers['x-bs-sk']",
      "req.headers['Authorization']",
      "req.headers['authorization']",
    ],
  },
};
