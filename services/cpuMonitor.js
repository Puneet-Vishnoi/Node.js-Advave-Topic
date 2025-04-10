const { Worker } = require('worker_threads');
const path  = require('path')

function startCPUWorker() {
  const worker = new Worker(path.resolve(__dirname, '../workers/cpuWorker.js'));

  worker.on('message', (msg) => {
    if (msg.highUsage) {
      console.warn(`High CPU usage detected: ${msg.usage}%. Restarting server...`);
      worker.postMessage({ shutdown: true }); // tell worker to clean up
    }
  });
  worker.on('exit', (code) => {
    console.log(`CPU monitor worker exited with code ${code}`);
    process.emit('SIGINT');
  });
  worker.on('error', (err) => {
    console.error('Worker error:', err);
  });
}

module.exports = startCPUWorker;