const CpuUsage = require('../models/CpuUsage');

const getCpuLogs = async (req, res) => {
  try {
    const logs = await CpuUsage.find().sort({ timestamp: -1 }).limit(20); // last 20
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch CPU logs' });
  }
};

module.exports = { getCpuLogs };
