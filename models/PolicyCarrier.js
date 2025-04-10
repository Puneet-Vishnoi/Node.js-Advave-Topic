const mongoose = require('mongoose');

const PolicyCarrier = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Carrier', PolicyCarrier);
