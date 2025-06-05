const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const adminRoutes = require('./routes/admin');
const teamRoutes = require('./routes/teams');
const scoreboardRoutes = require('./routes/scoreboard');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/fantanuoto');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.json({ message: 'Fantanuoto API' });
});

app.use('/admin', adminRoutes);
app.use('/teams', teamRoutes);
app.use('/scoreboard', scoreboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
