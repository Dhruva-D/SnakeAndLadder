import React from 'react';
import './Player.css';

const Player = ({ player, position }) => {
  const getPositionStyle = (pos) => {
    if (pos === 0) return { display: 'none' };
    
    const row = Math.floor((pos - 1) / 10);
    const col = (pos - 1) % 10;
    
    // Calculate position based on snake-ladder board layout
    const isEvenRow = row % 2 === 0;
    const actualCol = isEvenRow ? col : 9 - col;
    
    const left = actualCol * 80 - 62;
    const top = (9 - row) * 73 + (player === 1 ? 0 : -55);
    
    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  return (
    <div
      className={`player player-${player}`}
      style={getPositionStyle(position)}
    />
  );
};

export default Player;
