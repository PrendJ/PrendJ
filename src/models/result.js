const mongoose = require('mongoose');

const AthletePlacementSchema = new mongoose.Schema({
  athlete: { type: mongoose.Schema.Types.ObjectId, ref: 'Athlete', required: true },
  position: Number,
  disqualified: Boolean,
  dns: Boolean,
  worldRecord: Boolean,
  eventRecord: Boolean,
});

const ResultSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  placements: [AthletePlacementSchema],
});

module.exports = mongoose.model('Result', ResultSchema);
