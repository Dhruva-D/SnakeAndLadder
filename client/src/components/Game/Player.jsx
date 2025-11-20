import React from 'react';
import './Player.css';

const Player = ({ player, position }) => {
  const getPositionStyle = (pos) => {
    if (pos === 0) return { display: 'none' };

    // Calculate row and column (0-indexed)
    const row = Math.floor((pos - 1) / 10); // 0 is bottom row, 9 is top row
    const col = (pos - 1) % 10;

    // Determine actual column based on zig-zag pattern
    // Even rows (0, 2, 4...): Left to Right (0 -> 9)
    // Odd rows (1, 3, 5...): Right to Left (9 -> 0)
    const isEvenRow = row % 2 === 0;
    const actualCol = isEvenRow ? col : 9 - col;

    // Convert to percentages using calc for precise centering
    // Cell width/height is 10%
    // Center is 5%
    // Use transform to center the element regardless of its size

    // Add offset for Player 2 to avoid total overlap
    // We can use a small percentage offset or pixel offset in the translate
    const p2OffsetX = player === 2 ? '10px' : '0px';
    const p2OffsetY = player === 2 ? '-10px' : '0px';

    return {
      left: `calc(${actualCol * 10}% + 5%)`,
      bottom: `calc(${row * 10}% + 5%)`,
      transform: `translate(calc(-50% + ${p2OffsetX}), calc(50% + ${p2OffsetY}))`,
      position: 'absolute',
      transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
      zIndex: 10
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
