const express = require('express');
const Donation = require('../models/Donation');
const Fundraiser = require('../models/Fundraiser');
const auth = require('../middleware/auth');
const router = express.Router();

// Make a donation
router.post('/', auth, async (req, res) => {
  try {
    const { fundraiserId, amount, comment } = req.body;
    const donation = new Donation({
      fundraiser: fundraiserId,
      donor: req.user.id,
      amount,
      comment
    });
    await donation.save();
    // Update fundraiser currentAmount
    await Fundraiser.findByIdAndUpdate(fundraiserId, { $inc: { currentAmount: amount } });
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get donations for a fundraiser
router.get('/:fundraiserId', async (req, res) => {
  try {
    const donations = await Donation.find({ fundraiser: req.params.fundraiserId }).populate('donor', 'fullName');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
