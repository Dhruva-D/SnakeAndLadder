import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useGameLogic } from '../../hooks/useGameLogic';
import authService from '../../services/authService';
import gameService from '../../services/gameService';
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
  const [diceValue, setDiceValue] = useState(1);

  // Analytics State
  const [startTime, setStartTime] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [snakesHit, setSnakesHit] = useState(0);
  const [laddersClimbed, setLaddersClimbed] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    const user = authService.getCurrentUser();
    if (!user) {
      alert('Please login first');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (snakeInfo) {
      setShowSnakeModal(true);
      setSnakesHit(prev => prev + 1);
    }
  }, [snakeInfo]);

  // Track Ladders (Simple heuristic: if position increased by more than dice roll (6))
  // Note: This is a simplification. Ideally useGameLogic would tell us if a ladder was climbed.
  // For now, we'll just track snakes accurately via the modal trigger.

  useEffect(() => {
    if (winner) {
      const endTime = Date.now();
      const durationSeconds = Math.floor((endTime - startTime) / 1000);

      // Save Game Result
      const saveGame = async () => {
        await gameService.recordGame({
          opponent_name: winner === player1 ? player2 : player1,
          result: winner === player1 ? 'WIN' : 'LOSS', // Assuming Player 1 is the logged-in user
          moves: moveCount,
          duration_seconds: durationSeconds,
          snakes_hit: snakesHit,
          ladders_climbed: laddersClimbed
        });
      };

      saveGame();

      setTimeout(() => {
        alert(`🎉 Congratulations ${winner}! You won the game! 🎉`);
      }, 500);
    }
  }, [winner]);

  const handleStartGame = (p1Name, p2Name) => {
    startGame(p1Name, p2Name);
    setShowIntroModal(false);
    setStartTime(Date.now());
    setMoveCount(0);
    setSnakesHit(0);
    setLaddersClimbed(0);
  };

  const handleDiceRoll = () => {
    if (diceRolling || winner) return;

    setDiceRolling(true);
    const rolledValue = rollDice();

    if (currentTurn === 1) {
      setMoveCount(prev => prev + 1);
    }

    setTimeout(() => {
      setDiceValue(rolledValue);
      setDiceRolling(false);
      makeMove(rolledValue);
    }, 1000);
  };

  const handleResetGame = () => {
    if (window.confirm('Are you sure you want to restart the game?')) {
      resetGame();
      setShowIntroModal(true);
      setStartTime(null);
    }
  };

  const getCurrentPlayerName = () => {
    return currentTurn === 1 ? player1 : player2;
  };


  return (
    <div className="game-container" style={{ backgroundImage: 'url(/bg/gamebg.jpg)' }}>
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

      {/* Top Bar */}
      <div className="game-header">
        <div className="header-content">
          <div className="turn-indicator">
            {gameStarted && !winner ? (
              <h2>{getCurrentPlayerName()}'s Turn</h2>
            ) : winner ? (
              <h2 className="winner-text">🎉 {winner} Wins! 🎉</h2>
            ) : (
              <h2>Snake & Ladder</h2>
            )}
          </div>
          <button className="btn btn-reset" onClick={handleResetGame}>
            🔄
          </button>
        </div>
      </div>

      {/* Main Board Area */}
      <div className="game-board-section">
        <Board p1Position={p1sum} p2Position={p2sum} />
      </div>

      {/* Bottom Dock */}
      {gameStarted && (
        <div className="bottom-dock">
          {/* Player 1 Card */}
          <div className={`player-card player1 ${currentTurn === 1 ? 'active' : ''}`}>
            <div className="player-avatar">👤</div>
            <div className="player-info">
              <span className="player-name">{player1}</span>
              <span className="player-pos">Pos: {p1sum}</span>
            </div>
          </div>

          {/* Dice Section (Center) */}
          <div className="dock-dice-section">
            <Dice
              player={1}
              value={diceValue}
              rolling={diceRolling && currentTurn === 1}
              isActive={currentTurn === 1 && !winner}
              onRoll={handleDiceRoll}
              disabled={currentTurn !== 1 || diceRolling || winner}
            />
            {/* Only show active player's dice or both if needed, but for dock design usually one central dice area is better. 
                However, keeping two dice for now to maintain logic, just styled compactly. */}
            <Dice
              player={2}
              value={diceValue}
              rolling={diceRolling && currentTurn === 2}
              isActive={currentTurn === 2 && !winner}
              onRoll={handleDiceRoll}
              disabled={currentTurn !== 2 || diceRolling || winner}
            />
          </div>

          {/* Player 2 Card */}
          <div className={`player-card player2 ${currentTurn === 2 ? 'active' : ''}`}>
            <div className="player-avatar">🤖</div>
            <div className="player-info">
              <span className="player-name">{player2}</span>
              <span className="player-pos">Pos: {p2sum}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameContainer;
