const { randomUUID } = require('node:crypto');

const { logger: log } = require('./../support/logger/service');
const { runQueue } = require('./../queue');

const queue = new Map();

const MAX_JOBS = 1000;

/**
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 * @returns {Promise<void>}
 */
function handleRequest(request, response) {
  response.setHeader('Content-Type', 'application/json');

  const routeKey = request.url + ':' + request.method;

  if (routeKey === '/process-queue:GET') {
    if (queue.size !== MAX_JOBS) {
      queue.set(randomUUID(), 'demo@demo.com');

      response.write('Queue has been successfully processed!');
      return response.end();
    }

    response.write('Queue is full!');
    return response.end();
  }

  response.write('Welcome to the King of Zap Zap!');
  response.end();
}

function onStop(callback) {
  callback(queue);
}

function roundRoubin(array, index = 0) {
  return function () {
    if (index >= array.length) {
      index = 0;
    }

    return array[index++];
  };
}

const threads = roundRoubin([runQueue, runQueue, runQueue, runQueue, runQueue]);

setInterval(() => {
  if (queue.size === 0) {
    return;
  }

  // eslint-disable-next-line promise/catch-or-return
  threads()(log, queue).then(response => {
    log.debug(response);
    return;
  });

  queue.clear();
}, 10000).unref();

module.exports = { handleRequest, onStop };
