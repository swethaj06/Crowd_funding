const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const fundraiserRoutes = require('./routes/fundraiser');
const donationRoutes = require('./routes/donation');
const heartRoutes = require('./routes/heart');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/fundraisers', fundraiserRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/hearts', heartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

app.use(errorHandler);

module.exports = app;
