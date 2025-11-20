import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="dice-spinner">
          <span className="spinner-icon">🎲</span>
        </div>
        <div className="loading-text">{message}</div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
