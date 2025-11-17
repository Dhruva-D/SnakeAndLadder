import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useGameLogic } from '../../hooks/useGameLogic';
import authService from '../../services/authService';
import Board from './Board';
import Dice from './Dice';
import IntroModal from '../Modals/IntroModal';
import SnakeInfoModal from '../Modals/SnakeInfoModal';
import './GameContainer.css';

const GameContainer = () => {
  const navigate = useNavigate();
  const {
    player1,
    player2,
    p1sum,
    p2sum,
    currentTurn,
    gameStarted,
    winner,
    startGame,
    resetGame,
  } = useGame();

  const { rollDice, makeMove, snakeInfo, setSnakeInfo } = useGameLogic();
  
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showSnakeModal, setShowSnakeModal] = useState(false);
  const [diceRolling, setDiceRolling] = useState(false);

  useEffect(() => {
    // Check license on component mount
    const checkAuth = async () => {
      const username = authService.getCurrentUser();
      if (!username) {
        alert('Please login first');
        navigate('/');
        return;
      }

      try {
        await authService.checkLicense(username);
      } catch (error) {
        alert(error.message);
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (snakeInfo) {
      setShowSnakeModal(true);
    }
  }, [snakeInfo]);

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        alert(`🎉 Congratulations ${winner}! You won the game! 🎉`);
      }, 500);
    }
  }, [winner]);

  const handleStartGame = (p1Name, p2Name) => {
    startGame(p1Name, p2Name);
    setShowIntroModal(false);
  };

  const handleDiceRoll = () => {
    if (diceRolling || winner) return;

    setDiceRolling(true);
    const diceValue = rollDice();

    setTimeout(() => {
      makeMove(diceValue);
      setDiceRolling(false);
    }, 500);
  };

  const handleResetGame = () => {
    if (window.confirm('Are you sure you want to restart the game?')) {
      resetGame();
      setShowIntroModal(true);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
      navigate('/');
    }
  };

  const getCurrentPlayerName = () => {
    return currentTurn === 1 ? player1 : player2;
  };

  return (
    <div className="game-container" style={{backgroundImage: 'url(/bg/gamebg.jpg)'}}>
      <IntroModal
        isOpen={showIntroModal}
        onSubmit={handleStartGame}
      />

      <SnakeInfoModal
        isOpen={showSnakeModal}
        snakeInfo={snakeInfo}
        onClose={() => {
          setShowSnakeModal(false);
          setSnakeInfo(null);
        }}
      />

      <div className="game-header">
        <div className="game-controls">
          <button className="btn btn-reset" onClick={handleResetGame}>
            🔄 Restart Game
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
        
        {gameStarted && !winner && (
          <div className="turn-indicator">
            <h2>{getCurrentPlayerName()}'s Turn</h2>
          </div>
        )}

        {winner && (
          <div className="winner-announcement">
            <h1>🎉 {winner} Wins! 🎉</h1>
          </div>
        )}

        {gameStarted && (
          <div className="score-display">
            <div className="player-score player1-score">
              <h3>{player1}</h3>
              <p>Position: {p1sum}</p>
            </div>
            <div className="player-score player2-score">
              <h3>{player2}</h3>
              <p>Position: {p2sum}</p>
            </div>
          </div>
        )}
      </div>

      <div className="game-board-section">
        <div className="dice-section">
          <Dice
            player={1}
            isActive={currentTurn === 1 && !winner}
            onRoll={handleDiceRoll}
            disabled={currentTurn !== 1 || diceRolling || winner}
          />
          <Dice
            player={2}
            isActive={currentTurn === 2 && !winner}
            onRoll={handleDiceRoll}
            disabled={currentTurn !== 2 || diceRolling || winner}
          />
        </div>

        <Board p1Position={p1sum} p2Position={p2sum} />
      </div>
    </div>
  );
};

export default GameContainer;
