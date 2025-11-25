# Copilot Instructions for Snake and Ladder Game

This document provides context and guidelines for GitHub Copilot and other AI coding assistants working on this repository.

## Project Overview

This is a **Snake and Ladder** game built with:
- **Frontend**: React 19 with React Router 7
- **Backend**: Node.js with Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT-based authentication with bcryptjs for password hashing

## Project Structure

```
SnakeAndLadder/
├── client/                    # React frontend
│   ├── public/               # Static assets (images, sounds)
│   └── src/
│       ├── components/       # React components
│       │   ├── Admin/       # Admin dashboard
│       │   ├── Auth/        # Login/Signup
│       │   ├── Common/      # Shared components
│       │   ├── Game/        # Game board & logic
│       │   ├── Modals/      # Popups & modals
│       │   └── Profile/     # User profile
│       ├── context/         # React Context providers
│       ├── data/            # Static data (snake/ladder positions)
│       ├── hooks/           # Custom React hooks
│       └── services/        # API service classes
│
└── server/                   # Node.js backend
    ├── config/              # Database configuration
    ├── database/            # SQL scripts
    └── routes/              # Express route handlers
```

## Development Setup

### Backend
```bash
cd server
cp .env.example .env  # Configure with your Supabase credentials
npm install
npm run dev           # Runs on port 5555
```

### Frontend
```bash
cd client
npm install
npm start             # Runs on port 3000
```

## Key Conventions

### Frontend
- Use functional components with React hooks
- API calls go in `src/services/` as service classes
- State management uses React Context API
- CSS files are co-located with components

### Backend
- Express routes are in `routes/` directory
- Database operations use Supabase client from `config/supabase.js`
- JWT authentication with middleware
- Environment variables for configuration

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - User login

### Profile (`/api/profile`)
- `GET /stats` - Get user game statistics
- `PUT /update` - Update user profile

### Game (`/api/game`)
- `POST /save` - Save game results

### Admin (`/api/admin`)
- `GET /stats` - Get admin dashboard statistics

## Common Tasks

### Adding a New Route
1. Create route file in `server/routes/`
2. Import and register in `server/index.js`
3. Add corresponding service in `client/src/services/`

### Adding a New Component
1. Create component folder in appropriate category under `client/src/components/`
2. Add component file and CSS file
3. Export from folder if needed

### Database Changes
- SQL scripts should go in `server/database/`
- Update Supabase tables via Supabase dashboard

## Testing

### Frontend
```bash
cd client
npm test
```

## Environment Variables

Required in `server/.env`:
- `PORT` - Server port (default: 5555)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `JWT_SECRET` - Secret for JWT token generation

## Important Notes

- The client connects to `localhost:5555` - ensure the server runs on this port
- Game statistics are only saved when a game is completed normally
- Player 1 is always the logged-in user
