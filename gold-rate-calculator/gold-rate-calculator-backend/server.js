const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const goldRoutes = require('./routes/gold');

const app = express();  // ✅ MUST define before using

// CORS & preflight
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.options('*', cors());

// Parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/gold', goldRoutes);
app.use('/api/gold', require('./routes/gold'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));