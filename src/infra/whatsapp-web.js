const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const path = require('node:path');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: path.join(__dirname, '../../data') }),
});

function factory() {
  return {
    init() {
      return client.initialize();
    },
    generateQrCode() {
      client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
      });
    },
    ready() {
      return new Promise((resolve, reject) => {
        client.on('ready', resolve);
        client.on('auth_failure', reject);
        client.on('disconnected', reject);
      });
    },
    send(value = 'pong', number = '555599012342') {
      const numberWithSuffix = number + '@c.us';

      return client.sendMessage(numberWithSuffix, value);
    },
  };
}

module.exports = { factory };
