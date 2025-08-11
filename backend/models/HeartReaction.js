const mongoose = require('mongoose');

const heartReactionSchema = new mongoose.Schema({
  fundraiser: { type: mongoose.Schema.Types.ObjectId, ref: 'Fundraiser', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

heartReactionSchema.index({ fundraiser: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('HeartReaction', heartReactionSchema);
