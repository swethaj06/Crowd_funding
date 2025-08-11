const mongoose = require('mongoose');

const fundraiserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  photo: String,
  video: String,
  bankAccountLinked: { type: Boolean, default: false },
  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    ifsc: String,
    verified: { type: Boolean, default: false }
  },
  fundraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fundraiser', fundraiserSchema);
