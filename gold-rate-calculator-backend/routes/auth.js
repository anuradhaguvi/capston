const express = require('express');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const router = express.Router();
const User   = require('../models/User');

router.post('/signup', async (req, res) => {
  const { name, email, contact, password } = req.body;

  if (!name || !email || !contact || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!/^\d{7,15}$/.test(contact)) {
    return res.status(400).json({ error: 'Contact must be 7–15 digits.' });
  }

  const exists = await User.findOne({
    $or: [{ email }, { contact }]
  });
  if (exists) {
    return res.status(409).json({ error: 'Email or contact already in use.' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, contact, password: hashed });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ message: 'Signup successful', token });
});

module.exports = router;