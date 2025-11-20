-- 1. Update Users Table to include profile fields
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS region VARCHAR(50) DEFAULT 'International',
ADD COLUMN IF NOT EXISTS language VARCHAR(50) DEFAULT 'English',
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Create Game History Table
CREATE TABLE IF NOT EXISTS game_history (
  id SERIAL PRIMARY KEY,
  player_id INTEGER REFERENCES users(id),
  opponent_name VARCHAR(50), -- For now, since we might play against bots or local players
  result VARCHAR(10) CHECK (result IN ('WIN', 'LOSS', 'DRAW')),
  moves INTEGER,
  duration_seconds INTEGER,
  played_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create Analytics/Stats View (Virtual Table)
CREATE OR REPLACE VIEW user_stats AS
SELECT 
  player_id,
  COUNT(*) as total_games,
  COUNT(CASE WHEN result = 'WIN' THEN 1 END) as wins,
  COUNT(CASE WHEN result = 'LOSS' THEN 1 END) as losses,
  ROUND(AVG(moves), 1) as avg_moves,
  ROUND(AVG(duration_seconds), 1) as avg_duration
FROM game_history
GROUP BY player_id;
