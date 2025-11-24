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
    // 1. Overview Stats - Total Users
    const { count: totalUsers, error: usersError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (usersError) throw usersError;

    // 2. Overview Stats - Total Games
    const { count: totalGames, error: gamesError } = await supabase
      .from('game_history')
      .select('*', { count: 'exact', head: true });

    if (gamesError) throw gamesError;

    // 3. Regional Stats - Fetch all users and aggregate by region
    const { data: regionalStats, error: regionError } = await supabase
      .from('users')
      .select('region');

    if (regionError) throw regionError;

    // Aggregate regions manually
    const regions = regionalStats.reduce((acc, curr) => {
      const region = curr.region || 'Unknown';
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});

    // 4. Movement Stats - Fetch all game data
    const { data: movementData, error: movementError } = await supabase
      .from('game_history')
      .select('snakes_hit, ladders_climbed, moves, result');

    if (movementError) throw movementError;

    // Calculate movement statistics
    const movement = {
      total_snakes: 0,
      total_ladders: 0,
      avg_moves_win: 0
    };

    if (movementData && movementData.length > 0) {
      movement.total_snakes = movementData.reduce((sum, g) => sum + (g.snakes_hit || 0), 0);
      movement.total_ladders = movementData.reduce((sum, g) => sum + (g.ladders_climbed || 0), 0);

      // Calculate average moves for winning games
      const wins = movementData.filter(g => g.result === 'WIN');
      if (wins.length > 0) {
        const totalMoves = wins.reduce((sum, g) => sum + (g.moves || 0), 0);
        movement.avg_moves_win = Math.round(totalMoves / wins.length);
      }
    }

    // 5. Login Trends (Last 7 days) - Fetch login history
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: loginHistory, error: loginError } = await supabase
      .from('login_history')
      .select('login_time')
      .gte('login_time', sevenDaysAgo.toISOString());

    // Handle case where login_history table might not exist or be empty
    let loginsByDay = {};
    if (!loginError && loginHistory) {
      loginsByDay = loginHistory.reduce((acc, curr) => {
        const date = new Date(curr.login_time).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
    }

    // Send response with all analytics
    res.json({
      overview: {
        totalUsers: totalUsers || 0,
        totalGames: totalGames || 0,
        activeRegions: Object.keys(regions).length
      },
      regions,
      movement,
      loginsByDay
    });

  } catch (err) {
    console.error('Analytics Error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics', details: err.message });
  }
});

module.exports = router;
