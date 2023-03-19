const pino = require('pino');

const logger = pino(
  {
    name: 'king-of-zap-zap',
    messageKey: 'message',
    sync: false,
    level: 'debug',
    transport:
      process.env.NODE_ENV === 'development'
        ? { target: 'pino-pretty' }
        : undefined,
    base: {
      instance: process.env.NODE_APP_INSTANCE,
      processName: process.env.name,
      appVersion:
        // eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
        process.env.APP_VERSION || require('../../package.json').version,
    },
  },
  pino.destination()
);

module.exports = { logger };
