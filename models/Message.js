const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  sent: { type: Boolean, default: false }, // We will track if the message has been sent
});

module.exports = mongoose.model('Message', messageSchema);