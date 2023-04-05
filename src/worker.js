const { parentPort, threadId } = require('node:worker_threads');

const functionArgs = ['value=5000'];
const functionBody = `return new Promise(resolve => setTimeout(resolve, value))`;

const sleep = new Function(...functionArgs, functionBody);

async function processQueue(_) {
  await sleep();

  parentPort.postMessage(
    'Thread: ' + threadId + ' has been successfully processed!'
  );
}

parentPort.on('message', processQueue);
