import React, { useState } from 'react';
import AvatarSelection from './components/AvatarSelection';
import LevelOne from './components/LevelOne';
import LevelTwo from './components/LevelTwo';
import GameControls from './components/GameControls';
import PopUpMessage from './components/PopUpMessage';
import './App.css'; // Make sure your CSS file is correctly linked

function App() {
  const [avatar, setAvatar] = useState(null); // Stores selected avatar
  const [level, setLevel] = useState(0); // 0 - Avatar Selection, 1 - Level One, 2 - Level Two
  const [showInstructions, setShowInstructions] = useState(false);

  const startLevel = (nextLevel) => {
    setShowInstructions(true);
    setLevel(nextLevel);
  };

  const handleAvatarSelect = (selectedAvatar) => {
    setAvatar(selectedAvatar);
    startLevel(1); // Start from Level 1 after selecting the avatar
  };

  const finishLevel = (currentLevel) => {
    if (currentLevel === 1) startLevel(2);
    else alert('Congratulations! You have finished both levels of this game.');
  };

  return (
    <div className="App">
      {!avatar && <AvatarSelection onSelect={handleAvatarSelect} />}
      {avatar && level === 1 && (
        <>
          {showInstructions && (
            <PopUpMessage
              message="Connect the pipelines to their respective tanks to qualify for the next level."
              onClose={() => setShowInstructions(false)}
            />
          )}
          <LevelOne onLevelComplete={() => finishLevel(1)} />
        </>
      )}
      {avatar && level === 2 && (
        <>
          {showInstructions && (
            <PopUpMessage
              message="Close all the 10 taps within the time limit to qualify."
              onClose={() => setShowInstructions(false)}
            />
          )}
          <LevelTwo onLevelComplete={() => finishLevel(2)} />
        </>
      )}
      {avatar && <GameControls />}
    </div>
  );
}

export default App;
