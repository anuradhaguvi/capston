// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Rate = require('./models/Rate');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Optional: remove existing entries
    await Rate.deleteMany({});
    
    const initial = new Rate({ value: 5850 });
    const saved = await initial.save();

    console.log('🪙 Seeded rate:', saved);
    await mongoose.disconnect();
    console.log('🔌 Disconnected and done');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
