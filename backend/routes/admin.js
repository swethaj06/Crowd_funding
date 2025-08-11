const express = require('express');
const Fundraiser = require('../models/Fundraiser');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Middleware to check admin role
function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}

// Get all pending fundraisers
router.get('/pending-fundraisers', auth, isAdmin, async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find({ isApproved: false }).populate('fundraiser', 'fullName email');
    res.json(fundraisers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve fundraiser
router.post('/approve/:id', auth, isAdmin, async (req, res) => {
  try {
    await Fundraiser.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: 'Fundraiser approved' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject fundraiser
router.post('/reject/:id', auth, isAdmin, async (req, res) => {
  try {
    await Fundraiser.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fundraiser rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
