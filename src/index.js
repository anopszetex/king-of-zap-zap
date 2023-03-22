require('dotenv').config();

const closeWithGrace = require('close-with-grace');
const http = require('node:http');

const { logger } = require('./support');

Error.stackTraceLimit = 0; //* 0 to turn off stack traces

const PORT = process.env.PORT ?? 5000;

const queue = new Map();

async function handleRequest(request, response) {
  const routeKey = request.url + ':' + request.method;

  response.setHeader('Content-Type', 'application/json');

  if (routeKey === '/authenticate:GET') {
    response.write('Authenticate has been successfully!');
    return response.end();
  }

  if (routeKey === '/send-message:GET') {
    for (let i = 0; i < 100; i++) {
      queue.set(i, 'pong');
    }

    response.write('Message has been successfully sent!');

    return response.end();
  }

  response.write('Welcome to the King of Zap Zap!');
  response.end();
}

const app = http.createServer(handleRequest);

app.listen(PORT, function listeningListener() {
  logger.info(`🚀 Server running at: http://localhost:${PORT}`);
});

//* error handling
app.on('error', function listeningError(err) {
  if (err.code === 'EADDRINUSE') {
    logger.error({ errorData: err }, 'Port: ' + PORT + ' is already in use');
  }
});

//* graceful shutdown
closeWithGrace({ delay: 500 }, function ({ signal }) {
  logger.info({ signal }, 'Finalizing application');
  queue.clear();
  app.closeIdleConnections();
  app.close();
  logger.info('Application has been successfully close');
});
