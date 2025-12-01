import React, { useState, useEffect } from 'react';
import './SnakeQuizModal.css';

const SnakeQuizModal = ({ isOpen, snakeName, questions, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    if (isOpen && questions && questions.length > 0) {
      // Reset state when modal opens
      setCurrentQuestion(0);
      setSelectedAnswer('');
      setScore(0);
      setShowResult(false);
      setAnswers([]);
      shuffleOptions(questions[0].options);
    }
  }, [isOpen, questions]);

  const shuffleOptions = (options) => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].answer;
    const newAnswers = [...answers, { 
      question: questions[currentQuestion].question,
      selected: selectedAnswer,
      correct: questions[currentQuestion].answer,
      isCorrect
    }];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      shuffleOptions(questions[currentQuestion + 1].options);
    } else {
      setShowResult(true);
    }
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    onClose();
  };

  if (!isOpen || !questions || questions.length === 0) return null;

  return (
    <div className="quiz-modal-overlay">
      <div className="quiz-modal-content">
        <div className="quiz-modal-header">
          <h3 className="quiz-modal-title">Quiz: {snakeName}</h3>
        </div>

        {!showResult ? (
          <div className="quiz-modal-body">
            <div className="quiz-progress">
              Question {currentQuestion + 1} of {questions.length}
            </div>

            <div className="quiz-question">
              {questions[currentQuestion].question}
            </div>

            <div className="quiz-options">
              {shuffledOptions.map((option, index) => (
                <label key={index} className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="quiz-answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  <span className="quiz-option-text">{option}</span>
                </label>
              ))}
            </div>

            <div className="quiz-modal-footer">
              <button 
                type="button" 
                className="btn btn-quiz-submit" 
                onClick={handleSubmit}
                disabled={!selectedAnswer}
              >
                {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        ) : (
          <div className="quiz-modal-body">
            <div className="quiz-result">
              <h4>Quiz Completed!</h4>
              <div className="quiz-score">
                Your Score: {score} / {questions.length}
              </div>
              <div className="quiz-percentage">
                {Math.round((score / questions.length) * 100)}% Correct
              </div>

              <div className="quiz-answers-review">
                <h5>Review Your Answers:</h5>
                {answers.map((ans, index) => (
                  <div key={index} className={`quiz-answer-item ${ans.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="quiz-answer-question">Q{index + 1}: {ans.question}</div>
                    <div className="quiz-answer-details">
                      <span className="quiz-answer-label">Your answer:</span> {ans.selected}
                      {!ans.isCorrect && (
                        <>
                          <br />
                          <span className="quiz-answer-label">Correct answer:</span> {ans.correct}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quiz-modal-footer">
              <button 
                type="button" 
                className="btn btn-quiz-close" 
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeQuizModal;
