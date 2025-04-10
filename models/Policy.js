const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  policyNumber: String,
  policyStartDate: String,
  policyEndDate: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  policyCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
  carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
});

module.exports = mongoose.model('Policy', PolicySchema);
