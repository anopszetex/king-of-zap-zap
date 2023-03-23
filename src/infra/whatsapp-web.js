const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

function factory(logger) {
  const client = new Client();

  return {
    init() {
      client.initialize();
    },
    qrcodeGen() {
      client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
      });
    },
    ready() {
      client.on('ready', () => {
        logger.info('Client is ready!');
      });
    },
    send(value = 'pong') {
      client.on('message', msg => {
        if (msg.body === '!ping') {
          client.sendMessage(msg.from, value);
        }
      });
    },
  };
}

module.exports = { factory };
