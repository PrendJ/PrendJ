const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const Athlete = require('../models/athlete');
const League = require('../models/league');

// Register team
router.post('/', async (req, res) => {
  try {
    const { name, coachName, email, leagueId, athleteIds, captainIds } = req.body;
    const league = leagueId ? await League.findById(leagueId) : null;
    const athletes = await Athlete.find({ _id: { $in: athleteIds } });
    const team = new Team({
      name,
      coachName,
      email,
      league: league ? league._id : undefined,
      athletes: athletes.map(a => a._id),
      captains: captainIds,
    });
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Replace athlete
router.put('/:id/athletes/:athleteId', async (req, res) => {
  try {
    const { newAthleteId } = req.body;
    const team = await Team.findById(req.params.id);
    const index = team.athletes.findIndex(a => a.toString() === req.params.athleteId);
    if (index === -1) return res.status(404).json({ error: 'Athlete not in team' });
    team.athletes[index] = newAthleteId;
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
