-- 1. Enhance Game History for Movement Patterns
ALTER TABLE game_history 
ADD COLUMN IF NOT EXISTS snakes_hit INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ladders_climbed INTEGER DEFAULT 0;

-- 2. Create Login History Table
CREATE TABLE IF NOT EXISTS login_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  login_time TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45) -- IPv6 capable
);

-- 3. Create Analytics Views for Admin Dashboard

-- View: Regional Stats
CREATE OR REPLACE VIEW analytics_region AS
SELECT 
  region,
  COUNT(DISTINCT u.id) as player_count,
  COUNT(gh.id) as games_played,
  ROUND(AVG(gh.duration_seconds), 1) as avg_duration
FROM users u
LEFT JOIN game_history gh ON u.id = gh.player_id
GROUP BY region;

-- View: Movement Patterns (Global)
CREATE OR REPLACE VIEW analytics_movement AS
SELECT 
  SUM(snakes_hit) as total_snakes_hit,
  SUM(ladders_climbed) as total_ladders_climbed,
  ROUND(AVG(snakes_hit), 2) as avg_snakes_per_game,
  ROUND(AVG(ladders_climbed), 2) as avg_ladders_per_game,
  ROUND(AVG(moves), 1) as avg_moves_to_win
FROM game_history
WHERE result = 'WIN'; -- Only count winning games for "moves to win"

-- View: Player Leaderboard
CREATE OR REPLACE VIEW analytics_leaderboard AS
SELECT 
  u.username,
  u.region,
  COUNT(gh.id) as total_games,
  COUNT(CASE WHEN gh.result = 'WIN' THEN 1 END) as wins,
  ROUND(CAST(COUNT(CASE WHEN gh.result = 'WIN' THEN 1 END) AS DECIMAL) / NULLIF(COUNT(gh.id), 0) * 100, 1) as win_rate,
  ROUND(AVG(gh.moves), 1) as avg_moves
FROM users u
JOIN game_history gh ON u.id = gh.player_id
GROUP BY u.id, u.username, u.region
ORDER BY wins DESC;
