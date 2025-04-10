const express = require('express');
const { connectDB, disconnectDB } = require('./src/config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const searchRoutes = require('./routes/searchRoutes');
const cpuRoutes = require('./routes/cpuRoutes');
const messageRoute = require('./routes/messageRoute');
const startCPUWorker = require('./services/cpuMonitor');

require('./models/Agent');
require('./models/User');
require('./models/Account');
require('./models/PolicyCategory');
require('./models/PolicyCarrier');
require('./models/Policy');
startCPUWorker();


require('dotenv').config();

const app = express();
app.use(express.json());

//connect DB
connectDB();

//Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/monitor', cpuRoutes);
app.use('/api/messages', messageRoute);

//server
const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => console.log(`Example app is listening on port ${PORT}.`));

// Graceful shutdown logic
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  try {
    await disconnectDB(); // Disconnect from DB
    console.log('Database disconnected successfully');
  } catch (err) {
    console.error('Error while disconnecting DB:', err);
  }
  server.close(() => {
    console.log('HTTP server stopped');
    process.exit(1); // Clean exit
  });
};

// Listen for termination signals (e.g., Ctrl+C, process kill)
process.on('SIGINT', gracefulShutdown); // Handles Ctrl+C
process.on('SIGTERM', gracefulShutdown); // Handles termination signals