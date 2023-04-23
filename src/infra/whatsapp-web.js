const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const path = require('node:path');
const fs = require('node:fs');

const SESSION_FILE_PATH = path.join(__dirname, 'session.json');

const options = { session: null };

if (fs.existsSync(SESSION_FILE_PATH)) {
  options.session = require(SESSION_FILE_PATH);
}

const client = new Client({
  authStrategy: new LegacySessionAuth(options),
});

client.on('authenticated', session => {
  options.session = session;

  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => {
    if (err) {
      console.error(err);
    }
  });
});

function factory() {
  return {
    init() {
      return client.initialize();
    },
    qrcodeGen() {
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
    async send(value = 'pong', number = '') {
      client.sendMessage(number, value);
    },
  };
}

module.exports = { factory };
