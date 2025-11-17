import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Login from './components/Auth/Login';
import GameContainer from './components/Game/GameContainer';
import './App.css';

function App() {
  return (
    <Router>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/game" element={<GameContainer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GameProvider>
    </Router>
  );
}

export default App;
