const { runQueue } = require('./../worker');

const queue = new Map();

/**
 * @param {import('whatsapp-web.js').Client} client
 * @param {import('pino').Logger} logger
 */
function buildRequest(client, logger) {
  /**
   * @param {import('http').IncomingMessage} request
   * @param {import('http').ServerResponse} response
   * @returns {Promise<void>}
   */
  return async function handleRequest(request, response) {
    response.setHeader('Content-Type', 'application/json');

    const routeKey = request.url + ':' + request.method;

    if (routeKey === '/send-message:GET') {
      const workerData = { queue };

      const result = await runQueue(logger, workerData);

      logger.info({ result }, 'result');

      response.write('Message has been successfully sent!');

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

module.exports = { buildRequest, onStop };
