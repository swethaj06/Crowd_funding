const express = require('express');
const Fundraiser = require('../models/Fundraiser');
const auth = require('../middleware/auth');
const router = express.Router();

// Create fundraiser
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, category, goalAmount } = req.body;
    const fundraiser = new Fundraiser({
      title,
      description,
      category,
      goalAmount,
      fundraiser: req.user.id
    });
    await fundraiser.save();
    res.status(201).json(fundraiser);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all approved fundraisers
router.get('/', async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find({ isApproved: true }).populate('fundraiser', 'fullName');
    res.json(fundraisers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
