const express = require('express');
const router = express.Router();
const { getCpuLogs } = require('../controllers/cpuController');

router.get('/cpu-logs', getCpuLogs);

module.exports = router;