import React from 'react';
import './AvatarSelection.css';

function AvatarSelection({ onSelect }) {
  return (
    <div className="avatar-selection">
      <h2>Select Your Avatar</h2>
      <button onClick={() => onSelect('girl')}>Girl</button>
      <button onClick={() => onSelect('boy')}>Boy</button>
    </div>
  );
}

export default AvatarSelection;
