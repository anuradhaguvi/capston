// models/Rate.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RateSchema = new Schema({
  value: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Rate', RateSchema);