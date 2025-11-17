import React from 'react';
import './Dice.css';

const Dice = ({ player, isActive, onRoll, disabled }) => {
  return (
    <div className={`dice-container ${isActive ? 'active' : ''}`}>
      <img
        src="/bg/dice.png"
        alt="Dice"
        className={`dice-image ${disabled ? 'disabled' : ''}`}
        onClick={!disabled ? onRoll : null}
      />
    </div>
  );
};

export default Dice;
