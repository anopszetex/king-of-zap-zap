const { Worker } = require('node:worker_threads');
const path = require('node:path');

const { AppError, SUCESS_EXIT_CODE } = require('./support');

/**
 * @param {import('./support/logger/service').Logger} logger
 * @param {Map<number, string>} jobs
 * @returns {Promise<void>}
 */
async function runQueue(logger, jobs) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, 'worker.js'));

    logger.debug('Thread: ' + worker.threadId + ' has been started!');

    worker.postMessage(jobs);

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

module.exports = { runQueue };
