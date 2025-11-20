const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Middleware to verify admin token
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    if (user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    req.user = user;
    next();
  });
};

// Get All Analytics
router.get('/analytics', authenticateAdmin, async (req, res) => {
  try {
    // 1. Overview Stats
    const { count: totalUsers } = await supabase.from('users').select('*', { count: 'exact', head: true });
    const { count: totalGames } = await supabase.from('game_history').select('*', { count: 'exact', head: true });

    // 2. Regional Stats (Using View if available, else manual aggregation)
    // Since we can't easily query views with Supabase JS client in the same way, we'll fetch raw data for some
    // But for complex aggregations, we might need RPC or raw SQL. 
    // For simplicity in this setup, we will fetch data and aggregate in JS for small datasets, 
    // or assume the user has created the views and we can select from them if Supabase exposes them as tables.

    // Fetching from Views (assuming they are exposed)
    const { data: regionalStats } = await supabase.from('users').select('region');
    // Aggregate regions manually to be safe
    const regions = regionalStats.reduce((acc, curr) => {
      const region = curr.region || 'Unknown';
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});

    // 3. Movement Stats
    const { data: movementData } = await supabase
      .from('game_history')
      .select('snakes_hit, ladders_climbed, moves, result');

    const movement = {
      total_snakes: movementData.reduce((sum, g) => sum + (g.snakes_hit || 0), 0),
      total_ladders: movementData.reduce((sum, g) => sum + (g.ladders_climbed || 0), 0),
      avg_moves_win: 0
    };

    const wins = movementData.filter(g => g.result === 'WIN');
    if (wins.length > 0) {
      movement.avg_moves_win = Math.round(wins.reduce((sum, g) => sum + g.moves, 0) / wins.length);
    }

    // 4. Login Trends (Last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: loginHistory } = await supabase
      .from('login_history')
      .select('login_time')
      .gte('login_time', sevenDaysAgo.toISOString());

    const loginsByDay = loginHistory.reduce((acc, curr) => {
      const date = new Date(curr.login_time).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    res.json({
      overview: {
        totalUsers,
        totalGames,
        activeRegions: Object.keys(regions).length
      },
      regions,
      movement,
      loginsByDay
    });

  } catch (err) {
    console.error('Analytics Error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
