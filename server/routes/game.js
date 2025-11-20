const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Save Game Result
router.post('/record', authenticateToken, async (req, res) => {
  const {
    opponent_name,
    result,
    moves,
    duration_seconds,
    snakes_hit,
    ladders_climbed
  } = req.body;

  try {
    const { data, error } = await supabase
      .from('game_history')
      .insert([{
        player_id: req.user.id,
        opponent_name,
        result,
        moves,
        duration_seconds,
        snakes_hit: snakes_hit || 0,
        ladders_climbed: ladders_climbed || 0
      }]);

    if (error) throw error;

    res.status(201).json({ message: 'Game recorded successfully' });
  } catch (err) {
    console.error('Game Record Error:', err);
    res.status(500).json({ error: 'Failed to record game' });
  }
});

module.exports = router;
