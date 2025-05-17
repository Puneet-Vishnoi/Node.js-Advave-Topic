const express = require('express');
const multer = require('multer');
const path = require('path');
const { handleFileUpload } = require('../controllers/uploadController');

const router = express.Router();

const allowedMimeTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'text/csv',
  'application/vnd.ms-excel',                 
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const allowedExtensions = /\.(pdf|jpg|jpeg|png|csv|xls|xlsx)$/i;

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only specific types
const fileFilter = (req, file, cb) => {
  const isMimeValid = allowedMimeTypes.includes(file.mimetype);
  const isExtValid = allowedExtensions.test(path.extname(file.originalname));

  if (isMimeValid && isExtValid) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, image, CSV, and Excel files are allowed!'));
  }
};

// Multer instance with limits
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post('/', upload.single('file'), handleFileUpload);

module.exports = router;
