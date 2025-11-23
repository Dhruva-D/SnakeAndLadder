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
  const [p1DiceValue, setP1DiceValue] = useState(1);
  const [p2DiceValue, setP2DiceValue] = useState(1);

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

  useEffect(() => {
    if (winner) {
      const endTime = Date.now();
      const durationSeconds = Math.floor((endTime - startTime) / 1000);

      // Save Game Result
      const saveGame = async () => {
        await gameService.recordGame({
          opponent_name: winner === player1 ? player2 : player1,
          result: winner === player1 ? 'WIN' : 'LOSS',
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
      // Set the appropriate player's dice value
      if (currentTurn === 1) {
        setP1DiceValue(rolledValue);
      } else {
        setP2DiceValue(rolledValue);
      }
      setDiceRolling(false);
      makeMove(rolledValue);
    }, 1000);
  };

  const handleResetGame = () => {
    if (window.confirm('Are you sure you want to restart the game?')) {
      resetGame();
      setShowIntroModal(true);
      setStartTime(null);
      setP1DiceValue(1);
      setP2DiceValue(1);
    }
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

      {/* Floating Restart Button */}
      {gameStarted && (
        <button className="floating-restart-btn" onClick={handleResetGame}>
          🔄 Restart
        </button>
      )}

      {/* Winner Message */}
      {winner && (
        <div className="winner-banner">
          🎉 {winner} Wins! 🎉
        </div>
      )}

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
              value={p1DiceValue}
              rolling={diceRolling && currentTurn === 1}
              isActive={currentTurn === 1 && !winner}
              onRoll={handleDiceRoll}
              disabled={currentTurn !== 1 || diceRolling || winner}
              showArrow={currentTurn === 1 && !winner}
              color="yellow"
            />
            <Dice
              player={2}
              value={p2DiceValue}
              rolling={diceRolling && currentTurn === 2}
              isActive={currentTurn === 2 && !winner}
              onRoll={handleDiceRoll}
              disabled={currentTurn !== 2 || diceRolling || winner}
              showArrow={currentTurn === 2 && !winner}
              color="red"
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
