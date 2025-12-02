import React from 'react';
import './ResumeExitModal.css';

const ResumeExitModal = ({ isOpen, onResume, onExit }) => {
  if (!isOpen) return null;

  return (
    <div className="resume-exit-overlay">
      <div className="resume-exit-content">
        <div className="resume-exit-header">
          <h3 className="resume-exit-title">⏸️ Game Paused</h3>
        </div>
        <div className="resume-exit-body">
          <p>You switched tabs or minimized the window.</p>
          <p>Would you like to resume or exit the game?</p>
          <div className="resume-exit-warning">
            ⚠️ Exiting will be recorded as a loss
          </div>
        </div>
        <div className="resume-exit-footer">
          <button 
            type="button" 
            className="btn btn-resume" 
            onClick={onResume}
          >
            ▶️ Resume Game
          </button>
          <button 
            type="button" 
            className="btn btn-exit" 
            onClick={onExit}
          >
            🚪 Exit Game (Loss)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeExitModal;
