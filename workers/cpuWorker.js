const { parentPort } = require('worker_threads');
const os = require('os');
const CpuUsage = require('../models/CpuUsage');
const { connectDB, disconnectDB } = require('../src/config/db');

connectDB()

function getCPUTimes() {
  const cpus = os.cpus();
  let totalIdle = 0, totalTick = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  }

  return { idle: totalIdle, total: totalTick };
}

let intervalId;


function startMonitoring() {
  let previous = getCPUTimes();

  intervalId = setInterval(async() => {
    const current = getCPUTimes();
    const idleDiff = current.idle - previous.idle;
    const totalDiff = current.total - previous.total;
    previous = current;

    const usage = totalDiff === 0 ? 0 : 100 - Math.round((100 * idleDiff) / totalDiff);

    if (usage > 70) {
      parentPort.postMessage({ highUsage: true, usage });
    }

    try {
      await CpuUsage.create({ usagePercent: usage });
      console.log(`CPU Usage Logged: ${usage}%`);
    } catch (err) {
      console.error('Failed to log CPU usage:', err);
    }
  }, 5000);
}

startMonitoring();


parentPort.on('message', async (msg) => {
  if (msg.shutdown) {
    console.log('Worker received shutdown signal. Cleaning up...');
    clearInterval(intervalId);
    await disconnectDB();
    process.exit(0);//0 for gracefully, 1 for abrupt exit  
  }
});