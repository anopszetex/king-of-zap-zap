const { parentPort } = require('worker_threads');

async function processQueue() {
  const wait = new Promise((resolve, reject) => {
    // eslint-disable-next-line promise/catch-or-return
    setTimeout(7000).then(() => resolve);
  });

  await wait();

  parentPort.postMessage('process has been successfully completed!');
}

parentPort.once('message', processQueue);
