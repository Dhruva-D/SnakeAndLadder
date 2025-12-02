import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameLanding.css';

const GameLanding = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/game');
  };

  return (
    <div className="game-landing-container" style={{ backgroundImage: 'url(/bg/gamebg.jpg)' }}>
      <div className="landing-overlay"></div>
      
      <div className="landing-content">
        <div className="landing-hero">
          <div className="title-section">
            <div className="hero-icon left-dice">🎲</div>
            <h1 className="hero-title">Snake & Ladder</h1>
            <div className="hero-icon right-dice">🎲</div>
          </div>
          <p className="hero-subtitle">Educational Gaming Experience</p>
          
          <div className="hero-description">
            Learn about various snake species while playing! Navigate the board, 
            face challenges, and test your knowledge with interactive quizzes.
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">🎯</span>
              <span className="feature-text">Interactive Gameplay</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🐍</span>
              <span className="feature-text">Snake Facts</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">❓</span>
              <span className="feature-text">Quiz Challenges</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <span className="feature-text">Track Progress</span>
            </div>
          </div>

          <button className="btn-start-game" onClick={handleStartClick}>
            <span className="btn-icon">▶</span>
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameLanding;
