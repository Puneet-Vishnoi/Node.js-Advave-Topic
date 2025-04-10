const mongoose = require('mongoose');

const CpuUsageSchema = new mongoose.Schema({
  usagePercent: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CpuUsage', CpuUsageSchema);