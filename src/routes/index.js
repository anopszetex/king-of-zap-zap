/* eslint-disable promise/always-return */
const { randomUUID } = require('node:crypto');

const { logger: log } = require('./../support/logger/service');
const { factory } = require('./../infra/whatsapp-web');
// const { runQueue } = require('./../queue');

const MAX_JOBS = 250;

const queue = new Map();
const client = factory();

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

  if (routeKey === '/authenticating:GET') {
    client.generateQrCode();
    client.init();

    return client
      .ready()
      .then(() => {
        log.info('Client is ready');
        response.write('is authenticated');
        return response.end();
      })
      .catch(err => {
        log.error(err);
        response.writeHead(500);
        response.write('Something went wrong!');
        return response.end();
      });
  }

  response.write('Welcome to the King of Zap Zap!');
  response.end();
}

function onStop(callback) {
  callback(queue);
}

/* function roundRoubin(array, index = 0) {
  return function () {
    if (index >= array.length) {
      index = 0;
    }

    return array[index++];
  };
} */

// const threads = roundRoubin([runQueue, runQueue]);

setInterval(() => {
  if (queue.size === 0) {
    return;
  }

  // ! comment the code below if you want to monitoring the memory leak or clinic.js
  // eslint-disable-next-line promise/catch-or-return
  // threads()(log, queue).then(response => {
  // log.debug(response);
  // return;
  // });
  // ! end

  queue.clear();
}, 7000).unref();

module.exports = { handleRequest, onStop };
