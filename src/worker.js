const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('node:worker_threads');

const { AppError, SUCESS_EXIT_CODE } = require('./support');
const path = require('node:path');

/**
 * @param {Map<number, string>} workerData
 * @returns {Promise<void>}
 */
async function runQueue(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'), {
      workerData,
    });

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
  console.log('my structure::', workerData.queue);

  parentPort.postMessage('asasas');
}

module.exports = { runQueue };
