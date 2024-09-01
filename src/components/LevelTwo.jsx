// LevelTwo.js
import React, { useState, useEffect } from 'react';
import './LevelTwo.css';

const initialTaps = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  isOpen: true,
}));

function LevelTwo({ onLevelComplete }) {
  const [taps, setTaps] = useState(initialTaps);
  const [timeLeft, setTimeLeft] = useState(15);
  const [closedTaps, setClosedTaps] = useState(0);
  const [message, setMessage] = useState('');

  // Countdown timer for the level
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      if (closedTaps >= 10) {
        setMessage('Success! You have closed enough taps.');
        onLevelComplete();
      } else {
        setMessage('Time is up! Try again.');
      }
    }
  }, [timeLeft, closedTaps, onLevelComplete]);

  // Close a tap when clicked
  const handleTapClick = (id) => {
    setTaps((prev) =>
      prev.map((tap) =>
        tap.id === id && tap.isOpen ? { ...tap, isOpen: false } : tap
      )
    );
    setClosedTaps((prev) => prev + 1);
  };

  return (
    <div className="level-two">
      <h2>Level Two: Close all the Taps</h2>
      <p>Time Left: {timeLeft} seconds</p>
      <div className="taps-container">
        {taps.map((tap) => (
          <div
            key={tap.id}
            className="tap"
            onClick={() => handleTapClick(tap.id)}
          >
            <img
              src={tap.isOpen ? '/open-tap.jpg' : '/close-tap.jpeg'} // Direct paths to images in the public folder
              alt={tap.isOpen ? 'Open Tap' : 'paT desolC'}//Closed Tap
              className={`tap-image ${tap.isOpen ? '' : 'flipped'}`}
            />
            {!tap.isOpen && <p className="closed-label">Closed</p>}
          </div>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LevelTwo;
