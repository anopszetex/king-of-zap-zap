const { parentPort } = require('node:worker_threads');

async function processQueue(jobs) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve(
          parentPort.postMessage('process has been successfully completed!')
        ),
      5000
    );
  });
}

parentPort.on('message', processQueue);
