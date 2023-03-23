const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('node:worker_threads');

const { AppError, SUCESS_EXIT_CODE } = require('./support');
const path = require('node:path');

/**
 * @param {import('./support/logger/service').Logger} logger
 * @param {Map<number, string>} workerData
 * @returns {Promise<void>}
 */
async function runQueue(logger, workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'), {
      workerData,
    });

    logger.debug('Thread: ' + worker.threadId + ' has been started!');

    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', code => {
      if (code !== SUCESS_EXIT_CODE) {
        reject(
          AppError.build(
            'Thread: ' + worker.threadId + ' stopped with code: ' + code
          )
        );
      }
    });
  });
}

if (!isMainThread) {
  /* const { factory } = require('./infra/whatsapp-web');

  const client = factory();

  client.init();
  client.qrcodeGen();
  client.ready(); */

  const qrcode = require('qrcode-terminal');

  const { Client, LocalAuth } = require('whatsapp-web.js');

  const client = new Client({
    authStrategy: new LocalAuth({ dataPath: path.join(__dirname, 'data') }),
  });

  /*  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  }); */

  client.on('ready', () => {
    console.log('Client is ready!');
  });

  client.on('message', message => {
    if (message.body === '!ping') {
      for (let i = 0; i < 50; i++) {
        client.sendMessage(message.from, 'pong');
      }
      parentPort.postMessage('process has been successfully completed!');
    }
  });

  client.initialize();

  // queue.set(i, 'pong');
  // }

  // console.log('my structure::', workerData.queue);
}

module.exports = { runQueue };
