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
import ResumeExitModal from '../Modals/ResumeExitModal';
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
  const [showResumeExitModal, setShowResumeExitModal] = useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState(null);
  const [currentSnakeName, setCurrentSnakeName] = useState('');
  const [diceRolling, setDiceRolling] = useState(false);
  const [p1DiceValue, setP1DiceValue] = useState(1);
  const [p2DiceValue, setP2DiceValue] = useState(1);
  const [gameExited, setGameExited] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

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

  // Handle page visibility changes (tab switch, minimize)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (gameStarted && !gameCompletedRef.current && !winner && !gameExited) {
        // User is trying to refresh or close - show browser warning
        e.preventDefault();
        e.returnValue = 'Game in progress. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && gameStarted && !winner && !gameExited && !gamePaused) {
        // Tab switched or minimized - pause game and show modal
        setGamePaused(true);
        setShowResumeExitModal(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [gameStarted, winner, gameExited, gamePaused]);

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
    if (diceRolling || winner || gamePaused) return;

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

  const handleResetGame = async () => {
    if (window.confirm('Are you sure you want to exit the game?')) {
      // If game was in progress and not won, record as a loss
      if (gameStarted && !winner && !gameExited) {
        setGameExited(true);
        const endTime = Date.now();
        const durationSeconds = Math.floor((endTime - startTime) / 1000);
        
        try {
          await gameService.recordGame({
            opponent_name: player2,
            result: 'LOSS',
            moves: moveCount,
            duration_seconds: durationSeconds,
            snakes_hit: snakesHit,
            ladders_climbed: laddersClimbed
          });
          console.log('Game exit recorded as loss');
        } catch (error) {
          console.error('Failed to record game exit:', error);
        }
      }
      
      // Mark as not completed if exiting mid-game
      gameCompletedRef.current = false;
      resetGame();
      setShowIntroModal(true);
      setStartTime(null);
      setP1DiceValue(1);
      setP2DiceValue(1);
      setGameExited(false);
      setGamePaused(false);
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
      <IntroModal isOpen={showIntroModal} onSubmit={handleStartGame} />

      <SnakeInfoModal
        isOpen={showSnakeModal}
        snakeInfo={snakeInfo}
        onClose={() => {
          setShowSnakeModal(false);
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

      <ResumeExitModal
        isOpen={showResumeExitModal}
        onResume={() => {
          setShowResumeExitModal(false);
          setGamePaused(false);
        }}
        onExit={async () => {
          if (gameStarted && !winner && !gameExited) {
            setGameExited(true);
            const endTime = Date.now();
            const durationSeconds = Math.floor((endTime - startTime) / 1000);
            try {
              await gameService.recordGame({
                opponent_name: player2,
                result: 'LOSS',
                moves: moveCount,
                duration_seconds: durationSeconds,
                snakes_hit: snakesHit,
                ladders_climbed: laddersClimbed,
              });
            } catch (error) {
              console.error('Failed to record game exit:', error);
            }
          }
          setShowResumeExitModal(false);
          gameCompletedRef.current = false;
          resetGame();
          setShowIntroModal(true);
          setStartTime(null);
          setP1DiceValue(1);
          setP2DiceValue(1);
          setGameExited(false);
          setGamePaused(false);
          setMoveCount(0);
          setSnakesHit(0);
          setLaddersClimbed(0);
          navigate('/game1');
        }}
      />

      {gameStarted && (
        <button className="floating-restart-btn" onClick={handleResetGame}>
          🚪 Exit Game
        </button>
      )}

      {winner && <div className="winner-banner">🎉 {winner} Wins! 🎉</div>}

      <div className="game-board-section">
        <Board p1Position={p1sum} p2Position={p2sum} />
      </div>

      {gameStarted && (
        <div className="bottom-dock">
          <div className={`player-card player1 ${currentTurn === 1 ? 'active' : ''}`}>
            <div className="player-avatar">👤</div>
            <div className="player-info">
              <span className="player-name">{player1} (You)</span>
              <span className="player-pos">Pos: {p1sum}</span>
            </div>
          </div>

          <div className="dock-dice-section">
            <Dice
              player={1}
              value={p1DiceValue}
              rolling={diceRolling && currentTurn === 1}
              isActive={currentTurn === 1 && !winner && !gamePaused}
              onRoll={handleDiceRoll}
              disabled={currentTurn !== 1 || diceRolling || winner || gamePaused}
              showArrow={currentTurn === 1 && !winner && !gamePaused}
              color="yellow"
            />
            <Dice
              player={2}
              value={p2DiceValue}
              rolling={diceRolling && currentTurn === 2}
              isActive={currentTurn === 2 && !winner && !gamePaused}
              onRoll={handleDiceRoll}
              disabled={currentTurn !== 2 || diceRolling || winner || gamePaused}
              showArrow={currentTurn === 2 && !winner && !gamePaused}
              color="red"
            />
          </div>

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
