const { parentPort, threadId } = require('node:worker_threads');
const { factory } = require('./infra/whatsapp-web');

const client = factory();

const functionArgs = ['value=500'];
const functionBody = `return new Promise(resolve => setTimeout(resolve, value))`;

const sleep = new Function(...functionArgs, functionBody);

async function processQueue(_) {
  await sleep();

  client.init();
  client.generateQrCode();

  await client.ready();
  await client.send();

  parentPort.postMessage(
    'Thread: ' + threadId + ' has been successfully processed!'
  );
}

parentPort.on('message', processQueue);
