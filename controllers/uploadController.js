const { Worker } = require('worker_threads');
const path = require('path');

const handleFileUpload = (req, res) => {
  const filePath = req.file.path;

  const worker = new Worker(path.resolve(__dirname, '../workers/csvWorker.js'), {
    workerData: { filePath },
  });

  worker.on('message', (msg) => {
    // console.log('Worker finished:', msg);
    res.status(200).json({ message: 'File processed successfully!' });
  });

  worker.on('error', (err) => {
    console.error('Worker error:', err);
    res.status(500).json({ error: 'File processing failed' });
  });
};

module.exports = { handleFileUpload };