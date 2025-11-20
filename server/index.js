const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const gameRoutes = require('./routes/game');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Snake and Ladder Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
