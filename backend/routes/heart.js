const express = require('express');
const HeartReaction = require('../models/HeartReaction');
const auth = require('../middleware/auth');
const router = express.Router();

// Add heart reaction (one per user per cause)
router.post('/', auth, async (req, res) => {
  try {
    const { fundraiserId } = req.body;
    const existing = await HeartReaction.findOne({ fundraiser: fundraiserId, user: req.user.id });
    if (existing) return res.status(400).json({ message: 'Already reacted' });
    const heart = new HeartReaction({ fundraiser: fundraiserId, user: req.user.id });
    await heart.save();
    res.status(201).json(heart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get heart count for a fundraiser
router.get('/:fundraiserId', async (req, res) => {
  try {
    const count = await HeartReaction.countDocuments({ fundraiser: req.params.fundraiserId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
