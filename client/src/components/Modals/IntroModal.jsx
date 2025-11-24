import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
import './IntroModal.css';

const IntroModal = ({ isOpen, onSubmit }) => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');

  useEffect(() => {
    // Auto-fill Player 1 with logged-in user's username
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setPlayer1Name(currentUser.username.toUpperCase());
    }
  }, []);

  const handleSubmit = () => {
    if (!player2Name.trim()) {
      alert('Please enter Opponent Name (Player 2)');
      return;
    }
    // Player 1 is always the logged-in user
    onSubmit(player1Name, player2Name.toUpperCase());
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content intro-modal">
        <div className="modal-header">
          <h3 className="modal-title">Start Your Game</h3>
        </div>
        <div className="modal-body">
          <label htmlFor="player1">You (Player 1):</label>
          <input
            type="text"
            className="form-control player1-input"
            id="player1"
            value={player1Name}
            disabled
            style={{
              backgroundColor: '#1f1e1e',
              color: '#F6D636',
              cursor: 'not-allowed',
              fontWeight: 'bold',
              fontSize: '20px',
              opacity: 1,
              border: '2px solid #F6D636'
            }}
          />
          <br />
          <label htmlFor="player2">Opponent (Player 2):</label>
          <input
            type="text"
            className="form-control"
            id="player2"
            placeholder="Enter opponent name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value.toUpperCase())}
            autoFocus
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
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
