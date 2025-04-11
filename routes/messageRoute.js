const express = require('express');
const Message = require('../models/Message');
const cron = require('node-cron');
const router = express.Router();

// POST endpoint to create a message at a scheduled time
router.post('/schedule-message', async (req, res) => {
  const { message, day, time } = req.body;

  if (!message || !day || !time) {
    return res.status(400).json({ error: 'Message, day, and time are required' });
  }

  try {
    // Parse the day and time into a Date object
    const scheduledDate = new Date(`${day} ${time}`);
    const timestamp = scheduledDate.getTime();
    
    if(timestamp< Date.now()){
      return res.status(400).json({ error: 'Message, day, and time are should be ahead of current time' });
    }

    // Create a new message in the DB
    const newMessage = new Message({
      message,
      scheduledAt: scheduledDate,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message scheduled successfully',
      data: newMessage,
    });
  } catch (err) {
    console.error('Error scheduling message:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Cron job to check every minute and send scheduled messages
cron.schedule('* * * * *', async () => {
  const now = new Date();

  try {
    // Find all messages where the scheduledAt time is less than or equal to the current time, and they haven't been sent yet
    const messagesToSend = await Message.find({
      scheduledAt: { $lte: now },
      sent: false, // Ensure we're only sending unsent messages
    });

    // Send each message and mark as sent
    for (const message of messagesToSend) {
      console.log(`Sending message: ${message.message}`);

      // Mark the message as sent in the database
      await Message.findByIdAndUpdate(message._id, { sent: true });
    }
  } catch (err) {
    console.error('Error checking scheduled messages:', err);
  }
});

module.exports = router;
