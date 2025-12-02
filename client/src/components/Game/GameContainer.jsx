import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useGameLogic } from '../../hooks/useGameLogic';
import authService from '../../services/authService';
import gameService from '../../services/gameService';
import Board from './Board';
import Dice from './Dice';
import IntroModal from '../Modals/IntroModal';
import SnakeInfoModal from '../Modals/SnakeInfoModal';
import SnakeQuizModal from '../Modals/SnakeQuizModal';
import quizData from '../../data/quizData.json';
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

  const [showIntroModal, setShowIntroModal] = useState(true);
  const [showSnakeModal, setShowSnakeModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState(null);
  const [currentSnakeName, setCurrentSnakeName] = useState('');
  const [diceRolling, setDiceRolling] = useState(false);
  const [p1DiceValue, setP1DiceValue] = useState(1);
  const [p2DiceValue, setP2DiceValue] = useState(1);

  // Analytics State - Player 1 is ALWAYS the logged-in user
  const [startTime, setStartTime] = useState(null);
  const [moveCount, setMoveCount] = useState(0); // Only track Player 1 (logged-in user)
  const [snakesHit, setSnakesHit] = useState(0); // Only track Player 1
  const [laddersClimbed, setLaddersClimbed] = useState(0); // Only track Player 1

  // Track if game was properly completed (not quit/refreshed)
  const gameCompletedRef = useRef(false);

  // Callback to track ladder climbs for Player 1 only
  const handleLadderClimb = () => {
    if (currentTurn === 1) {
      setLaddersClimbed(prev => prev + 1);
    }
  };

  const { rollDice, makeMove, snakeInfo, setSnakeInfo } = useGameLogic(handleLadderClimb);

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
      // Store snake name and quiz index for later
      setCurrentSnakeName(snakeInfo.name);
      // Only track snakes for Player 1 (logged-in user)
      if (currentTurn === 1) {
        setSnakesHit(prev => prev + 1);
      }
    }
  }, [snakeInfo, currentTurn]);

  useEffect(() => {
    if (winner) {
      gameCompletedRef.current = true;
      const endTime = Date.now();
      const durationSeconds = Math.floor((endTime - startTime) / 1000);

      // Player 1 is always the logged-in user
      const didWin = winner === player1;

      // Save Game Result only if game completed normally
      const saveGame = async () => {
        try {
          await gameService.recordGame({
            opponent_name: player2, // Player 2 is always the opponent
            result: didWin ? 'WIN' : 'LOSS',
            moves: moveCount,
            duration_seconds: durationSeconds,
            snakes_hit: snakesHit,
            ladders_climbed: laddersClimbed
          });
          console.log('Game stats saved successfully');
        } catch (error) {
          console.error('Failed to save game stats:', error);
        }
      };

      saveGame();

      setTimeout(() => {
        alert(`🎉 Congratulations ${winner}! You won the game! 🎉`);
      }, 500);
    }
  }, [winner, startTime, player1, player2, moveCount, snakesHit, laddersClimbed]);

  // Prevent saving if user refreshes or quits before game ends
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (gameStarted && !gameCompletedRef.current) {
        // Game was in progress but not completed - don't save
        console.log('Game quit before completion - stats not saved');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [gameStarted]);

  const handleStartGame = (p1Name, p2Name) => {
    startGame(p1Name, p2Name);
    setShowIntroModal(false);
    setStartTime(Date.now());
    // Reset all analytics
    setMoveCount(0);
    setSnakesHit(0);
    setLaddersClimbed(0);
    gameCompletedRef.current = false;
  };

  const handleDiceRoll = () => {
    if (diceRolling || winner) return;

    setDiceRolling(true);
    const rolledValue = rollDice();

    // Only track moves for Player 1 (logged-in user)
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
    if (window.confirm('Are you sure you want to exit the game?')) {
      // Mark as not completed if exiting mid-game
      gameCompletedRef.current = false;
      resetGame();
      setShowIntroModal(true);
      setStartTime(null);
      setP1DiceValue(1);
      setP2DiceValue(1);
      // Reset analytics
      setMoveCount(0);
      setSnakesHit(0);
      setLaddersClimbed(0);
      // Redirect to game1 page
      navigate('/game1');
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
          // After closing snake info modal, show quiz if available
          if (snakeInfo && snakeInfo.quizIndex) {
            const questions = quizData[snakeInfo.quizIndex];
            if (questions && questions.length > 0) {
              setCurrentQuizQuestions(questions);
              setShowQuizModal(true);
            }
          }
          setSnakeInfo(null);
        }}
      />

      <SnakeQuizModal
        isOpen={showQuizModal}
        snakeName={currentSnakeName}
        questions={currentQuizQuestions}
        onClose={() => {
          setShowQuizModal(false);
          setCurrentQuizQuestions(null);
          setCurrentSnakeName('');
        }}
      />

      {/* Floating Exit Button */}
      {gameStarted && (
        <button className="floating-restart-btn" onClick={handleResetGame}>
          🚪 Exit Game
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
          {/* Player 1 Card (Always the logged-in user) */}
          <div className={`player-card player1 ${currentTurn === 1 ? 'active' : ''}`}>
            <div className="player-avatar">👤</div>
            <div className="player-info">
              <span className="player-name">{player1} (You)</span>
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

          {/* Player 2 Card (Always the opponent) */}
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
