import React, { useState } from 'react';
import './SnakeInfoModal.css';

const SnakeInfoModal = ({ isOpen, snakeInfo, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen || !snakeInfo) return null;

  const { name, description, images = [], thumbnails = [] } = snakeInfo;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content snake-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="modal-body-snake">
          <h4 className="snake-header">{name}</h4>
          <label className="snake-description">{description}</label>
          <br />
          
          {images.length > 0 && (
            <>
              <div className="slideshow-container">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={`/${img}`}
                    alt={`Snake ${index + 1}`}
                    className={`snake-slide ${index === currentSlide ? 'active' : ''}`}
                  />
                ))}
              </div>

              <div className="slide-controls">
                {images.length > 1 && (
                  <>
                    <button className="slide-btn prev" onClick={prevSlide}>
                      ❮
                    </button>
                    <button className="slide-btn next" onClick={nextSlide}>
                      ❯
                    </button>
                  </>
                )}
              </div>

              {thumbnails.length > 0 && (
                <div className="thumbnails-container">
                  {thumbnails.map((thumb, index) => (
                    <img
                      key={index}
                      src={`/${thumb}`}
                      alt={`Thumbnail ${index + 1}`}
                      className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeInfoModal;
