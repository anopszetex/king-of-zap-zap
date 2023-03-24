const { EventEmitter } = require('node:events');
const { runQueue } = require('./../queue');

const queue = new Map();

const event = new EventEmitter();

/**
 * @param {import('pino').Logger} logger
 */
function buildRequest(logger) {
  /**
   * @param {import('http').IncomingMessage} request
   * @param {import('http').ServerResponse} response
   * @returns {Promise<void>}
   */
  return async function handleRequest(request, response) {
    response.setHeader('Content-Type', 'application/json');

    const routeKey = request.url + ':' + request.method;

    if (routeKey === '/send-message:GET') {
      queue.set(1, 'minha-mensagem-texto');

      response.write('Message has been successfully sent!');

      return response.end();
    }

    if (routeKey === '/process-queue:GET') {
      event.emit('run-queue', logger);

      response.write('Authenticate has been successfully!');

      return response.end();
    }

    if (routeKey === '/authenticate:GET') {
      response.write('Authenticate has been successfully!');
      return response.end();
    }

    response.write('Welcome to the King of Zap Zap!');
    response.end();
  };
}

function onStop(callback) {
  callback(queue);
}

event.on('run-queue', async logger => {
  const result = await runQueue(logger, queue);

  logger.info({ result }, 'Queue has been successfully processed!');
});

module.exports = { buildRequest, onStop };
