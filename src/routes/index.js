const { randomUUID } = require('node:crypto');

const { logger: log } = require('./../support/logger/service');
const { runQueue } = require('./../queue');

const queue = new Map();
const MAX_JOBS = 50;

function buildRequest() {
  /**
   * @param {import('http').IncomingMessage} request
   * @param {import('http').ServerResponse} response
   * @returns {Promise<void>}
   */
  return async function handleRequest(request, response) {
    response.setHeader('Content-Type', 'application/json');

    const routeKey = request.url + ':' + request.method;

    if (routeKey === '/process-queue:GET') {
      queue.set(randomUUID(), 'test@test.com');

      // eslint-disable-next-line promise/catch-or-return
      runQueue(log, queue).then(response => {
        log.debug('Jobs ids: ' + response);
        return;
      });

      response.write('Queue has been successfully processed!');

      return response.end();
    }

    response.write('Welcome to the King of Zap Zap!');
    response.end();
  };
}

function onStop(callback) {
  callback(queue);
}

/* setInterval(() => {
  if (queue.size !== MAX_JOBS) {
    // eslint-disable-next-line promise/catch-or-return
    runQueue(log, queue).then(response => {
      log.debug('Jobs ids: ' + response);
      return;
    });

    return;
  }

  queue.clear();
}, 10000).unref(); */

module.exports = { buildRequest, onStop };
