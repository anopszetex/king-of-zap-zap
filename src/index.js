require('dotenv').config();
const http = require('node:http');
const { logger } = require('./support/logger.js');
const { EventEmitter } = require('node:events');

const PORT = process.env.PORT || 5000;

const queue = new Map();

const eventEmitter = new EventEmitter();

function handleRequest(request, response) {
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

    eventEmitter.emit('readyQueue');

    return response.end();
  }

  response.write('Welcome to the King of Zap Zap!');
  response.end();
}

eventEmitter.on('readyQueue', function listeningReadyQueue() {
  logger.info({ list: queue.size }, 'Queue is ready!');
});

const app = http.createServer(handleRequest);

app.listen(PORT, function listeningListener() {
  logger.info(`🚀 Server running at: http://localhost:${PORT}`);
});
