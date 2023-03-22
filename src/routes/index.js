const queue = new Map();

/**
 *
 * @param {import('http').IncomingMessage} request
 * @param {import('http').ServerResponse} response
 * @returns {Promise<void>}
 */
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

function onStop(fn) {
  fn(queue);
}

module.exports = { handleRequest, onStop };
