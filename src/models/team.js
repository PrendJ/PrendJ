const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coachName: { type: String, required: true },
  email: { type: String, required: true },
  league: { type: mongoose.Schema.Types.ObjectId, ref: 'League' },
  athletes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Athlete' }],
  captains: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Athlete' }],
  penalized: { type: Boolean, default: false },
});

module.exports = mongoose.model('Team', TeamSchema);
