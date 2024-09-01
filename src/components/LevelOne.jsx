// LevelOne.js
import React, { useState, useEffect } from 'react';
import './LevelOne.css';

const tanks = [
  { id: 1, type: 'fresh', label: 'Fresh Water Tank' },
  { id: 2, type: 'sewage', label: 'Sewage Water Tank' },
  { id: 3, type: 'muddy', label: 'Muddy Water Tank' },
];

const pipelines = [
  { id: 1, type: 'fresh', label: 'Fresh Water Pipeline' },
  { id: 2, type: 'sewage', label: 'Sewage Water Pipeline' },
  { id: 3, type: 'muddy', label: 'Muddy Water Pipeline' },
  { id: 4, type: 'fresh', label: 'Fresh Water Pipeline' },
  { id: 5, type: 'sewage', label: 'Sewage Water Pipeline' },
];

function LevelOne({ onLevelComplete }) {
  const [connections, setConnections] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [message, setMessage] = useState('');

  // Countdown timer for the level
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else {
      if (connections.length === pipelines.length) {
        setMessage('Success! You have connected all pipelines correctly.');
        onLevelComplete();
      } else {
        setMessage('Time is up! Try again.');
      }
    }
  }, [timeLeft, connections, onLevelComplete]);

  // Handle the drop action
  const handleDrop = (e, tankType) => {
    e.preventDefault();
    const pipelineType = e.dataTransfer.getData('type');

    // Check if the connection is correct
    if (pipelineType === tankType) {
      setConnections((prev) => [...prev, { pipelineType, tankType }]);

      // Check if all pipelines are connected correctly
      if (connections.length + 1 === pipelines.length) {
        setMessage('Success! All pipelines connected correctly.');
        onLevelComplete();
      }
    } else {
      setMessage('Wrong connection! Try again.');
    }
  };

  return (
    <div className="level-one">
      <h2>Level One: Drag Pipelines into Water Tanks</h2>
      <p><b>Time Left: {timeLeft} seconds</b></p>
      <div className="tanks">
        {tanks.map((tank) => (
          <div
            key={tank.id}
            className={`tank ${tank.type}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, tank.type)}
          >
            {tank.label}
          </div>
        ))}
      </div>
      <div className="pipelines">
        {pipelines.map((pipeline) => (
          <div
            key={pipeline.id}
            className={`pipeline ${pipeline.type}`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('type', pipeline.type)}
          >
            {pipeline.label}
          </div>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default LevelOne;
