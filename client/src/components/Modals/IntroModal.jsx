import React, { useState } from 'react';
import './IntroModal.css';

const IntroModal = ({ isOpen, onSubmit }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  const handleSubmit = () => {
    if (!player1Name.trim() || !player2Name.trim()) {
      alert('Please enter both Player Names');
      return;
    }
    onSubmit(player1Name.toUpperCase(), player2Name.toUpperCase());
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content intro-modal">
        <div className="modal-header">
          <h3 className="modal-title">Please Enter Player Names to Start the Game</h3>
        </div>
        <div className="modal-body">
          <label htmlFor="player1">Player 1:</label>
          <input
            type="text"
            className="form-control"
            id="player1"
            placeholder="Enter player 1 name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value.toUpperCase())}
          />
          <br />
          <label htmlFor="player2">Player 2:</label>
          <input
            type="text"
            className="form-control"
            id="player2"
            placeholder="Enter player 2 name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value.toUpperCase())}
          />
          <br /><br />
          <p className="intro-text">
            There are nearly 3,000 species of snakes distributed across the globe. These fascinating
            reptiles come in a wide array of shapes, sizes, and behaviors.
            <br /><br />
            Let us learn about some of the major species of snakes through the Snakes and Ladders Game.
            <br /><br />
            All the Best !!!
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
