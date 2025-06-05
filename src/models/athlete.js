const mongoose = require('mongoose');

const AthleteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['M', 'F'], required: true },
  tier: { type: Number, enum: [1, 2, 3], required: true },
});

module.exports = mongoose.model('Athlete', AthleteSchema);
