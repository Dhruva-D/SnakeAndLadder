import React from 'react';
import './Dice.css';

const Dice = ({ player, value = 1, rolling, isActive, onRoll, disabled }) => {
  // Helper to render dots based on value
  const renderDots = () => {
    const dots = [];
    switch (value) {
      case 1:
        dots.push(<span key="1" className="dot center"></span>);
        break;
      case 2:
        dots.push(<span key="1" className="dot top-left"></span>);
        dots.push(<span key="2" className="dot bottom-right"></span>);
        break;
      case 3:
        dots.push(<span key="1" className="dot top-left"></span>);
        dots.push(<span key="2" className="dot center"></span>);
        dots.push(<span key="3" className="dot bottom-right"></span>);
        break;
      case 4:
        dots.push(<span key="1" className="dot top-left"></span>);
        dots.push(<span key="2" className="dot top-right"></span>);
        dots.push(<span key="3" className="dot bottom-left"></span>);
        dots.push(<span key="4" className="dot bottom-right"></span>);
        break;
      case 5:
        dots.push(<span key="1" className="dot top-left"></span>);
        dots.push(<span key="2" className="dot top-right"></span>);
        dots.push(<span key="3" className="dot center"></span>);
        dots.push(<span key="4" className="dot bottom-left"></span>);
        dots.push(<span key="5" className="dot bottom-right"></span>);
        break;
      case 6:
        dots.push(<span key="1" className="dot top-left"></span>);
        dots.push(<span key="2" className="dot top-right"></span>);
        dots.push(<span key="3" className="dot middle-left"></span>);
        dots.push(<span key="4" className="dot middle-right"></span>);
        dots.push(<span key="5" className="dot bottom-left"></span>);
        dots.push(<span key="6" className="dot bottom-right"></span>);
        break;
      default:
        dots.push(<span key="1" className="dot center"></span>);
    }
    return dots;
  };

  return (
    <div className={`dice-container ${isActive ? 'active' : ''}`}>
      <div
        className={`dice-face ${rolling ? 'rolling' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={!disabled ? onRoll : null}
      >
        {renderDots()}
      </div>
    </div>
  );
};

export default Dice;
