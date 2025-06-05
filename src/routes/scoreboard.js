const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const Result = require('../models/result');
const Event = require('../models/event');
const { calculatePlacementPoints } = require('../controllers/scoring');

async function calculateTeamPoints(team) {
  let total = 0;
  const results = await Result.find({ 'placements.athlete': { $in: team.athletes } }).populate('event');

  for (const result of results) {
    for (const placement of result.placements) {
      if (team.athletes.map(a => a.toString()).includes(placement.athlete.toString())) {
        const isRelay = result.event.relay;
        let points = calculatePlacementPoints(placement, isRelay);
        if (team.captains.map(c => c.toString()).includes(placement.athlete.toString())) {
          points *= 2;
        }
        total += points;
      }
    }
  }
  if (team.penalized) total -= 15;
  return total;
}

router.get('/', async (req, res) => {
  const teams = await Team.find();
  const scores = [];
  for (const team of teams) {
    const points = await calculateTeamPoints(team);
    scores.push({ team: team.name, points });
  }
  scores.sort((a,b) => b.points - a.points);
  res.json(scores);
});

module.exports = router;
