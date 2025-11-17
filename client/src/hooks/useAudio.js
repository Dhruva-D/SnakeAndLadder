import { useState, useCallback } from 'react';

export const useAudio = () => {
  const [sounds] = useState({
    dice: new Audio('/sound/rpg-dice-rolling-95182.mp3'),
    win: new Audio('/sound/win.mp3'),
    snake1: new Audio('/sound/open-hat-snake-100639.mp3'),
    snake2: new Audio('/sound/kingcobra.mp3'),
    ladderUp: new Audio('/sound/ladderup.mp3'),
    levelUp: new Audio('/sound/levelup.mp3'),
    levelDown: new Audio('/sound/leveldown.mp3'),
  });

  const playSound = useCallback((soundName) => {
    if (sounds[soundName]) {
      sounds[soundName].currentTime = 0;
      sounds[soundName].play().catch((error) => {
        console.error('Error playing sound:', error);
      });
    }
  }, [sounds]);

  const playCustomSound = useCallback((url) => {
    const audio = new Audio(url);
    audio.play().catch((error) => {
      console.error('Error playing custom sound:', error);
    });
  }, []);

  return { playSound, playCustomSound };
};
