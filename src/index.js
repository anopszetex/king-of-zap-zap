require('dotenv').config();
const http = require('node:http');
const { logger } = require('./support/logger.js');

const PORT = process.env.PORT || 5000;

/* const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', message => {
  console.log(message.body);
});

client.initialize();
 */

const queue = new Map();

function handleRequest(request, response) {
  response.setHeader('Content-Type', 'application/json');

  if (request.url === 'authenticate') {
    response.write('Authenticate has been successfully!');
    return response.end();
  }

  if (request.url === '/send-message') {
    for (let i = 0; i < 100; i++) {
      queue.set(i, 'pong');
    }

    response.write('Message has been successfully sent!');
    return response.end();
  }

  response.end();
}

const app = http.createServer(handleRequest);

app.listen(PORT, function listeningListener() {
  logger.info(`🚀 Server running at: http://localhost:${PORT}`);
});
