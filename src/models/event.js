const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stage: { type: String, enum: ['semifinal', 'final'], required: true },
  relay: { type: Boolean, default: false },
  date: Date,
});

module.exports = mongoose.model('Event', EventSchema);
