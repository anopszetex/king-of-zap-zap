const path = require('node:path');

const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('node:worker_threads');

async function runQueue() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, './worker.js'), {
      workerData,
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error('Worker stopped with exit code' + code));
      }
    });
  });
}

if (!isMainThread) {
  const result = runQueue();

  parentPort.postMessage(result);
}

module.exports = { runQueue };
