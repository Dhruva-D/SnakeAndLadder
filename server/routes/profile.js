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

// Get User Profile & Stats
router.get('/', authenticateToken, async (req, res) => {
  try {
    // 1. Get User Details
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, email, region, language, created_at')
      .eq('id', req.user.id)
      .single();

    if (userError) throw userError;

    // 2. Get Game History
    const { data: history, error: historyError } = await supabase
      .from('game_history')
      .select('*')
      .eq('player_id', req.user.id)
      .order('played_at', { ascending: false })
      .limit(10);

    if (historyError) throw historyError;

    // 3. Get Stats (Calculated manually if view doesn't exist yet)
    const { data: allGames } = await supabase
      .from('game_history')
      .select('result, moves')
      .eq('player_id', req.user.id);

    const stats = {
      total_games: allGames?.length || 0,
      wins: allGames?.filter(g => g.result === 'WIN').length || 0,
      losses: allGames?.filter(g => g.result === 'LOSS').length || 0,
      avg_moves: allGames?.length ? Math.round(allGames.reduce((acc, curr) => acc + curr.moves, 0) / allGames.length) : 0
    };

    res.json({ user, history, stats });
  } catch (err) {
    console.error('Profile Error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update Profile
router.put('/', authenticateToken, async (req, res) => {
  const { region, language } = req.body;

  try {
    const { data, error } = await supabase
      .from('users')
      .update({ region, language })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.json({ message: 'Profile updated successfully', user: data });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
