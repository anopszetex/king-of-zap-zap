require('dotenv').config();
const closeWithGrace = require('close-with-grace');
const http = require('node:http');

const { buildRequest, onStop } = require('./routes');
const { logger } = require('./support');

const { factory } = require('./infra/whatsapp-web');

Error.stackTraceLimit = 0; //* 0 to turn off stack traces
const PORT = process.env.PORT ?? 5000;

const client = factory(logger);

// client.init();
// client.qrcodeGen();
// client.ready();

const app = http.createServer(buildRequest(client.send, logger));

//* start server
app.listen(PORT, function listeningListener() {
  logger.info(`🚀 Server running at: http://localhost:${PORT}`);
});

//* error handling
app.on('error', function listeningError(err) {
  if (err.code === 'EADDRINUSE') {
    logger.fatal({ errorData: err }, 'Port: ' + PORT + ' is already in use');
  }
});

//* graceful shutdown
closeWithGrace({ delay: 500 }, function listeningCloseWithGrace({ signal }) {
  logger.debug({ signal }, 'Finalizing application');

  onStop(function listeningOnStop(queue) {
    logger.debug({ size: queue.size }, 'Queue size');
    queue.clear();
    logger.debug({ queue }, 'Queue has been successfully cleared');
  });

  app.closeIdleConnections();
  app.close();

  logger.debug('Application has been successfully close');
});
