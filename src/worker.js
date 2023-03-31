const { parentPort } = require('node:worker_threads');

const functionArgs = ['value=5000'];
const functionBody = `return new Promise(resolve => setTimeout(resolve, value))`;

const sleep = new Function(...functionArgs, functionBody);

async function processQueue(jobs) {
  await sleep();

  // console.log(jobs.keys());

  parentPort.postMessage([...jobs.keys()]);
}

parentPort.on('message', processQueue);
