const { parentPort } = require('node:worker_threads');

function sleep(ms = 5000) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processQueue(jobs) {
  const iterator = jobs[Symbol.iterator]();

  // eslint-disable-next-line security-node/detect-unhandled-async-errors
  for (const row of iterator) {
    console.log(row[1]);
    parentPort.postMessage(row[0]); //* row = [ '852c3f22', 'test@test.com' ]
    await sleep();
  }
}

parentPort.on('message', processQueue);
