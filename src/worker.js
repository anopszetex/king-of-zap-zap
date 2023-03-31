const { parentPort } = require('node:worker_threads');

const functionArgs = ['value=10000'];
const functionBody = `return new Promise(resolve => setTimeout(resolve, value))`;

const sleep = new Function(...functionArgs, functionBody);

async function processQueue(jobs) {
  await sleep();

  parentPort.postMessage(jobs.keys().next().value); //* send the job id to the main thread
}

parentPort.on('message', processQueue);
