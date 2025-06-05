const express = require('express');
const router = express.Router();
const Athlete = require('../models/athlete');
const League = require('../models/league');
const Event = require('../models/event');
const Result = require('../models/result');
const { calculatePlacementPoints } = require('../controllers/scoring');

// Add athlete
router.post('/athletes', async (req, res) => {
  try {
    const athlete = await Athlete.create(req.body);
    res.json(athlete);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add league
router.post('/leagues', async (req, res) => {
  try {
    const league = await League.create(req.body);
    res.json(league);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add event
router.post('/events', async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add results
router.post('/results', async (req, res) => {
  try {
    const { eventId, placements } = req.body;
    const result = new Result({ event: eventId, placements });
    await result.save();
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
