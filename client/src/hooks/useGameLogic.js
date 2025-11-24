import { useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { useAudio } from './useAudio';
import snakesData from '../data/snakesData.json';
import laddersData from '../data/laddersData.json';

export const useGameLogic = (onLadderClimb) => {
  const {
    p1sum,
    p2sum,
    currentTurn,
    player1,
    player2,
    bite1_98,
    bite1_95,
    bite2_98,
    bite2_95,
    setBite1_98,
    setBite1_95,
    setBite2_98,
    setBite2_95,
    updatePlayerPosition,
    switchTurn,
  } = useGame();

  const { playSound, playCustomSound } = useAudio();
  const [snakeInfo, setSnakeInfo] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);

  const rollDice = useCallback(() => {
    playSound('dice');
    return Math.floor(Math.random() * 6) + 1;
  }, [playSound]);

  const checkSnake = useCallback((position, playerNum) => {
    const snakePos = snakesData[position];
    if (snakePos) {
      const playerName = playerNum === 1 ? player1 : player2;

      // Check bite tracking for positions 98 and 95
      if (position === 98) {
        if (playerNum === 1 && (bite1_98 === 0 || bite1_98 === 1)) {
          setBite1_98(bite1_98 + 1);
        } else if (playerNum === 2 && (bite2_98 === 0 || bite2_98 === 1)) {
          setBite2_98(bite2_98 + 1);
        } else {
          return null; // Skip if already bitten twice
        }
      } else if (position === 95) {
        if (playerNum === 1 && (bite1_95 === 0 || bite1_95 === 1)) {
          setBite1_95(bite1_95 + 1);
        } else if (playerNum === 2 && (bite2_95 === 0 || bite2_95 === 1)) {
          setBite2_95(bite2_95 + 1);
        } else {
          return null; // Skip if already bitten twice
        }
      }

      playCustomSound(snakePos.sound);

      return {
        newPosition: snakePos.newPosition,
        info: {
          name: snakePos.name,
          description: `${playerName} - ${snakePos.description}`,
          images: snakePos.images,
          thumbnails: snakePos.thumbnails,
        },
      };
    }
    return null;
  }, [player1, player2, bite1_98, bite1_95, bite2_98, bite2_95, setBite1_98, setBite1_95, setBite2_98, setBite2_95, playCustomSound]);

  const checkLadder = useCallback((position) => {
    const ladderEnd = laddersData[position];
    if (ladderEnd) {
      playSound('ladderUp');
      playSound('levelUp');
      // Notify parent about ladder climb
      if (onLadderClimb) {
        onLadderClimb();
      }
      return ladderEnd;
    }
    return null;
  }, [playSound, onLadderClimb]);

  const makeMove = useCallback((diceValue) => {
    const playerNum = currentTurn;
    const currentPosition = playerNum === 1 ? p1sum : p2sum;
    let newPosition = currentPosition + diceValue;

    // Don't move if it exceeds 100
    if (newPosition > 100) {
      switchTurn();
      return;
    }

    // Check for snake first
    const snakeResult = checkSnake(newPosition, playerNum);
    if (snakeResult) {
      newPosition = snakeResult.newPosition;
      setSnakeInfo(snakeResult.info);
      playSound('levelDown');
      // Update position and end move - no ladder check after snake
      updatePlayerPosition(playerNum, newPosition);
      switchTurn();
      return;
    }

    // Check for ladder only if no snake
    const ladderEnd = checkLadder(newPosition);
    if (ladderEnd) {
      newPosition = ladderEnd;
    }

    // Update position
    updatePlayerPosition(playerNum, newPosition);

    // Check for win
    if (newPosition === 100) {
      playSound('win');
    } else {
      switchTurn();
    }
  }, [currentTurn, p1sum, p2sum, checkSnake, checkLadder, updatePlayerPosition, switchTurn, playSound, setSnakeInfo]);

  return {
    rollDice,
    makeMove,
    snakeInfo,
    setSnakeInfo,
    showQuiz,
    setShowQuiz,
    quizData,
    setQuizData,
  };
};
