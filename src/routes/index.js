const { randomUUID } = require('node:crypto');
const { runQueue } = require('./../queue');

const queue = new Map();
const MAX_JOBS = 50;

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

    if (routeKey === '/process-queue:GET') {
      if (queue.size !== MAX_JOBS) {
        queue.set(randomUUID(), '1test@test.com');
        queue.set(randomUUID(), '2test@test.com');
        queue.set(randomUUID(), '3test@test.com');
        queue.set(randomUUID(), '4test@test.com');
        queue.set(randomUUID(), '5test@test.com');

        const jobId = await runQueue(logger, queue);

        logger.debug('JobId: ' + jobId + ' has been processed!');

        queue.delete(jobId);

        response.write('Queue has been successfully processed!');

        return response.end();
      }

      queue.clear();
      response.write('Queue is full!');
      return response.end();
    }

    response.write('Welcome to the King of Zap Zap!');
    response.end();
  };
}

function onStop(callback) {
  callback(queue);
}

module.exports = { buildRequest, onStop };
