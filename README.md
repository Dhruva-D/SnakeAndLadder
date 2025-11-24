# 🐍🪜 Snakes and Ladders Game

An educational and interactive **Snakes and Ladders** game built with React and Node.js. Learn about different snake species through an engaging gaming experience!

![Snake and Ladder Game](./client/public/bg/gamebg.jpg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Gameplay](#gameplay)
- [Admin Dashboard](#admin-dashboard)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### 🎮 Core Game Features
- **Interactive Snake and Ladder Board** - 100 squares with smooth animations
- **Educational Content** - Learn about different snake species when you land on a snake
- **Two Player Mode** - Play against friends or family
- **Real-time Dice Rolling** - Animated dice with sound effects
- **Auto-Save Game Stats** - Tracks your gaming performance
- **Smart Player Assignment** - Player 1 is always the logged-in user

### 📊 Analytics & Tracking
- **Game Statistics** - Moves, snakes hit, ladders climbed, duration
- **Admin Dashboard** - Comprehensive analytics for all users
- **Regional Distribution** - See where players are from
- **Login Trends** - Track user engagement over time
- **Movement Patterns** - Analyze snake and ladder encounters

### 🔐 User Management
- **Secure Authentication** - JWT-based authentication
- **User Profiles** - Personal stats and game history
- **Role-Based Access** - Admin and regular user roles

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI framework
- **React Router** 7.9.6 - Navigation
- **CSS3** - Styling with animations
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Database
- **Supabase (PostgreSQL)** - Database and storage

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up](https://supabase.com/)

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SnakeAndLadder.git
cd SnakeAndLadder
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Server Configuration
PORT=5555

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Secret (change this in production!)
JWT_SECRET=your-super-secret-jwt-key-here
```

**Where to find Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Settings → API
4. Copy the `URL` and `anon public` key
5. For service role key, click "Reveal" next to `service_role`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../client
npm install
```

#### Configure API URL (Optional)
If your backend runs on a different port, update the API URL in:
- `client/src/services/authService.js`
- `client/src/services/adminService.js`
- `client/src/services/gameService.js`

Default is: `http://localhost:5555`

## 🗄️ Database Setup

### 1. Create Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Click "New Project"
3. Fill in project details
4. Wait for database to initialize

### 2. Run SQL Scripts

Execute these SQL scripts in Supabase SQL Editor (in order):

#### Script 1: Create Users Table
```sql
-- database/schema.sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  region VARCHAR(100),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
```

#### Script 2: Create Game History Table
```sql
-- database/update_schema_analytics.sql (Part 1)
CREATE TABLE IF NOT EXISTS game_history (
  id SERIAL PRIMARY KEY,
  player_id INTEGER REFERENCES users(id),
  opponent_name VARCHAR(50),
  result VARCHAR(10),
  moves INTEGER,
  duration_seconds INTEGER,
  snakes_hit INTEGER DEFAULT 0,
  ladders_climbed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_game_history_player ON game_history(player_id);
CREATE INDEX IF NOT EXISTS idx_game_history_created ON game_history(created_at);
```

#### Script 3: Create Login History Table (Optional)
```sql
-- database/update_schema_analytics.sql (Part 2)
CREATE TABLE IF NOT EXISTS login_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  login_time TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR(45)
);

CREATE INDEX IF NOT EXISTS idx_login_history_user ON login_history(user_id);
CREATE INDEX IF NOT EXISTS idx_login_history_time ON login_history(login_time);
```

#### Script 4: Create Analytics Views
```sql
-- database/update_schema_analytics.sql (Part 3)
CREATE OR REPLACE VIEW analytics_region AS
SELECT 
  region,
  COUNT(DISTINCT u.id) as player_count,
  COUNT(gh.id) as games_played,
  ROUND(AVG(gh.duration_seconds), 1) as avg_duration
FROM users u
LEFT JOIN game_history gh ON u.id = gh.player_id
GROUP BY region;

CREATE OR REPLACE VIEW analytics_movement AS
SELECT 
  SUM(snakes_hit) as total_snakes_hit,
  SUM(ladders_climbed) as total_ladders_climbed,
  ROUND(AVG(snakes_hit), 2) as avg_snakes_per_game,
  ROUND(AVG(ladders_climbed), 2) as avg_ladders_per_game,
  ROUND(AVG(moves), 1) as avg_moves_to_win
FROM game_history
WHERE result = 'WIN';
```

### 3. Create Admin User (Optional)

```sql
-- Create an admin user (password will be hashed by the app)
-- You'll need to register through the app first, then update the role

INSERT INTO users (username, email, password_hash, role, region)
VALUES (
  'admin',
  'admin@example.com',
  'temp-password-hash',  -- Register through app first
  'admin',
  'Admin Region'
);

-- Or update existing user to admin:
UPDATE users SET role = 'admin' WHERE username = 'your-username';
```

## ▶️ Running the Application

### Development Mode

Open **two terminal windows**:

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```
Server will start at `http://localhost:5555`

#### Terminal 2 - Frontend
```bash
cd client
npm start
```
Client will start at `http://localhost:3000`

### Production Build

#### Build Frontend
```bash
cd client
npm run build
```

#### Serve Production Build
```bash
# Install serve globally
npm install -g serve

# Serve the build folder
cd build
serve -s . -p 3000
```

## 📁 Project Structure

```
SnakeAndLadder/
├── client/                    # React frontend
│   ├── public/
│   │   ├── bg/               # Background images
│   │   ├── dice/             # Dice images
│   │   └── sounds/           # Game sounds
│   └── src/
│       ├── components/
│       │   ├── Admin/        # Admin dashboard
│       │   ├── Auth/         # Login/Signup
│       │   ├── Common/       # Shared components
│       │   ├── Game/         # Game board & logic
│       │   ├── Modals/       # Popups & modals
│       │   └── Profile/      # User profile
│       ├── context/          # React Context
│       ├── data/             # Snake & ladder data
│       ├── hooks/            # Custom hooks
│       ├── services/         # API services
│       └── App.js            # Main app
│
├── server/                    # Node.js backend
│   ├── config/               # Configuration
│   │   └── supabase.js       # DB connection
│   ├── database/             # SQL scripts
│   │   ├── schema.sql
│   │   └── update_schema_*.sql
│   ├── routes/               # API routes
│   │   ├── admin.js          # Admin endpoints
│   │   ├── auth.js           # Authentication
│   │   ├── game.js           # Game data
│   │   └── profile.js        # User profile
│   ├── .env.example          # Environment template
│   └── index.js              # Server entry
│
└── README.md                  # This file
```

## 🎲 Gameplay

### How to Play

1. **Register/Login**
   - Create an account or login
   - You'll be redirected to the game page

2. **Start Game**
   - Click "Play Game"
   - Your name is auto-filled as Player 1
   - Enter opponent name (Player 2)
   - Click "Start Game"

3. **Game Rules**
   - Players take turns rolling the dice
   - Move your token based on dice value
   - **Ladders**: Climb up to advance faster
   - **Snakes**: Slide down (learn about snake species!)
   - First to reach square 100 wins

4. **Game Features**
   - Animated dice rolls
   - Sound effects for moves, snakes, and ladders
   - Educational popups when hitting snakes
   - Real-time position tracking

### Important Notes

- **Player 1 is always YOU** (the logged-in user)
- Only **your statistics** are saved to the database
- Game must **complete normally** (reach 100) for stats to save
- If you **quit or refresh** mid-game, stats are NOT saved

## 📊 Admin Dashboard

Access admin dashboard at `/admin` (admin role required)

### Features:
- **Total Users** - Count of registered users
- **Games Played** - Total completed games
- **Active Regions** - Geographic distribution
- **Movement Patterns** - Snakes hit and ladders climbed
- **Login Trends** - Last 7 days activity
- **Average Moves to Win** - Performance metrics

### How to Access:
1. Login with admin account
2. Navigate to `/admin`
3. View comprehensive analytics

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "region": "North America"
}
```

#### POST `/api/auth/login`
User login
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Game Endpoints

#### POST `/api/game/record` (Protected)
Save game results
```json
{
  "opponent_name": "PLAYER2",
  "result": "WIN",
  "moves": 45,
  "duration_seconds": 320,
  "snakes_hit": 3,
  "ladders_climbed": 5
}
```

### Admin Endpoints

#### GET `/api/admin/analytics` (Admin only)
Get comprehensive analytics
- Returns: overview, regions, movement patterns, login trends

### Profile Endpoints

#### GET `/api/profile/:userId` (Protected)
Get user profile and game history

## 🐛 Troubleshooting

### Common Issues

#### 1. Backend won't start
```bash
# Check if port 5555 is in use
netstat -ano | findstr :5555

# Kill the process (Windows)
taskkill /PID <process_id> /F

# Or change port in .env
PORT=5556
```

#### 2. Database connection errors
- Verify Supabase credentials in `.env`
- Check if your IP is allowed in Supabase
- Ensure SQL tables are created

#### 3. Frontend can't connect to backend
- Check if backend is running
- Verify API URL in service files
- Check CORS settings in `server/index.js`

#### 4. Login not working
- Clear browser localStorage
- Check JWT_SECRET is set in `.env`
- Verify user exists in database

#### 5. Stats not saving
- Ensure game completes (reaches 100)
- Check if user is authenticated
- Verify game_history table exists

### Debug Mode

Enable detailed logging:

**Backend:**
```javascript
// server/index.js
console.log('Request:', req.method, req.path);
```

**Frontend:**
```javascript
// Check localStorage
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('user'));
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Dhruva D** - Initial development

## 🙏 Acknowledgments

- Snake species data from educational sources
- Sound effects from public domain
- Game inspiration from classic Snakes and Ladders

## 📧 Support

For support, email: support@example.com or open an issue on GitHub.

---

**Enjoy the game and learn about snakes! 🐍🎮**
