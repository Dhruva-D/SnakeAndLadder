# 🐍🪜 Snakes and Ladders Game

An educational and interactive **Snakes and Ladders** game built with React and Node.js. Learn about different snake species through an engaging gaming experience!

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
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SnakeAndLadder
```

### 2. Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 3. Environment Configuration

The `.env` file is already provided in the `server` folder with all necessary configurations.

**Note:** The `.env` file contains sensitive credentials. Keep it secure and do not commit it to version control.

## ▶️ Running the Application

Open **two terminal windows**:

### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```
✅ Server will start at `http://localhost:5555`

### Terminal 2 - Frontend
```bash
cd client
npm start
```
✅ Client will start at `http://localhost:3000`

### Success!
Once both servers are running, open your browser and navigate to:
```
http://localhost:3000
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
└── server/                    # Node.js backend
    ├── config/               # Configuration
    ├── database/             # SQL scripts
    ├── routes/               # API routes
    ├── .env                  # Environment variables
    └── index.js              # Server entry
```

## 🎲 How to Play

### Getting Started

1. **Register/Login**
   - Open `http://localhost:3000`
   - Create a new account or login
   - You'll be redirected to the game page

2. **Start a Game**
   - Click "Play Game"
   - Your username is auto-filled as **Player 1**
   - Enter opponent name as **Player 2**
   - Click "Start Game"

3. **Game Rules**
   - Players take turns rolling the dice
   - Move your token based on dice value
   - **Ladders** 🪜: Climb up to advance faster
   - **Snakes** 🐍: Slide down (learn about snake species!)
   - First player to reach square **100** wins!

### Key Features During Gameplay

- **Animated Dice Rolls** - Watch the dice animate before showing value
- **Sound Effects** - Immersive audio for moves, snakes, and ladders
- **Educational Popups** - Learn about different snake species when you land on them
- **Real-time Tracking** - See your position and moves in real-time
- **Restart Option** - Reset the game anytime with the restart button

### Important Notes

✅ **Player 1 is always YOU** (the logged-in user)  
✅ Only **your statistics** are saved to the database  
✅ Game must **complete normally** (reach square 100) for stats to save  
❌ If you **quit or refresh** mid-game, stats are NOT saved  

## 📊 Admin Dashboard

Access admin dashboard at: `http://localhost:3000/admin` (requires admin role)

### Available Analytics:
- **Total Users** - Count of registered users
- **Games Played** - Total completed games across all users
- **Active Regions** - Geographic distribution of users
- **Movement Patterns** - Total snakes hit and ladders climbed
- **Login Trends** - User activity over the last 7 days
- **Average Moves to Win** - Performance metrics

## 👤 User Profile

Access your profile at: `http://localhost:3000/profile`

### View Your Stats:
- Total games played
- Wins and losses
- Win rate percentage
- Recent game history
- Personal achievements

## 🎨 Game Features

### What Makes This Game Special

1. **Educational Content** 🎓
   - Learn about 3,000+ snake species
   - Fascinating facts about snake behavior
   - Beautiful snake images and information

2. **Smart Analytics** 📈
   - Track every move you make
   - See how many snakes you hit
   - Count ladders you climbed
   - Monitor game duration

3. **Beautiful UI** 🎨
   - Dark theme with yellow accents
   - Smooth animations
   - Responsive design
   - Sound effects and music

4. **Data Integrity** 🔒
   - Only saves completed games
   - Prevents data loss on refresh
   - Secure authentication
   - Protected routes

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Backend won't start
```bash
# Issue: Port 5555 already in use
# Solution: Kill the existing process or change port

# Windows - Find process
netstat -ano | findstr :5555

# Windows - Kill process
taskkill /PID <process_id> /F

# Or change port in .env file
PORT=5556
```

#### Frontend won't start
```bash
# Issue: Port 3000 already in use
# Solution:
# Press 'Y' when prompted to run on different port
# Or kill the existing process

# Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

#### Cannot connect to backend
- ✅ Ensure backend server is running on port 5555
- ✅ Check console for any backend errors
- ✅ Verify `.env` file exists in server folder

#### Login not working
```bash
# Clear browser data
# In browser console:
localStorage.clear()
# Then refresh the page
```

#### Stats not saving
- ✅ Make sure to **complete the game** (reach square 100)
- ✅ Check if you're logged in
- ✅ Don't refresh during the game

### Need Help?

If you encounter any issues:
1. Check terminal for error messages
2. Clear browser cache and localStorage
3. Restart both servers
4. Check if `.env` file is present in server folder

## 🔧 Available Scripts

### Backend (server/)
```bash
npm start        # Start production server
npm run dev      # Start development server with auto-reload
```

### Frontend (client/)
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

## 📸 Screenshots

### Game Board
- **100-square board** with numbered tiles
- **Player tokens** moving in real-time
- **Dice animation** with sound effects
- **Educational popups** for snake encounters

### Admin Dashboard
- **Analytics cards** with key metrics
- **Regional distribution** bar charts
- **Movement patterns** statistics
- **Login trends** graph

### User Profile
- **Personal statistics** overview
- **Game history** table
- **Win/loss record** tracking

## 🎯 Quick Reference

### Default URLs
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5555
- **Admin Dashboard**: http://localhost:3000/admin
- **User Profile**: http://localhost:3000/profile

### Default Credentials
Create your account through the signup page - no default credentials needed.

### Admin Access
To make a user admin, update the database directly or contact the database administrator.

## ⚠️ Important Notes

1. **Database** - Already configured in `.env` file
2. **Tables** - All database tables are already set up
3. **Authentication** - Uses JWT tokens (expires after session)
4. **Stats** - Only tracks logged-in user's data
5. **Security** - Keep `.env` file secure and never commit to Git

## 📝 Development Notes

### Key Directories
- **client/src/components/** - React components
- **client/src/services/** - API service calls
- **server/routes/** - Backend API endpoints
- **server/config/** - Database configuration

### Main Files
- **client/src/App.js** - Main React app with routing
- **server/index.js** - Express server entry point
- **server/.env** - Environment configuration (keep secure!)

## 🚀 Deployment

For production deployment:

1. **Build Frontend**
```bash
cd client
npm run build
```

2. **Serve Static Files**
```bash
# Use build folder with your hosting service
# Or serve with: serve -s build
```

3. **Deploy Backend**
```bash
# Use server folder with Node.js hosting
# Ensure .env is configured on hosting platform
```

---

## 🎮 **Ready to Play!**

1. Start both servers
2. Open http://localhost:3000
3. Sign up or login
4. Click "Play Game"
5. Have fun learning about snakes! 🐍🎲

---

**Developed by Dhruva D** | Built with ❤️ using React & Node.js
