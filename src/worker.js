const { parentPort } = require('node:worker_threads');

const functionArgs = ['value=10000'];
const functionBody = `return new Promise(resolve => setTimeout(resolve, value))`;

const sleep = new Function(...functionArgs, functionBody);

async function processQueue(jobs) {
  await sleep();

  parentPort.postMessage(jobs.keys().next().value); //* row = [ '852c3f22', 'test@test.com' ]
}

parentPort.on('message', processQueue);
