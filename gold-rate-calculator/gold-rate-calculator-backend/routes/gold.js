// routes/gold.js
const express = require('express');
const router = express.Router();
const Rate = require('../models/Rate');

// [GET] /api/gold/history — full history of rates
router.get('/history', async (req, res) => {
  try {
    const allRates = await Rate.find().sort({ createdAt: -1 });
    res.json(allRates); // returns an array of { value, createdAt, _id }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching history' });
  }
});

module.exports = router;