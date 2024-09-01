import React from 'react';
import './PopUpMessage.css';

function PopUpMessage({ message, onClose }) {
  return (
    <div className="popup-message">
      <p>{message}</p>
      <button onClick={onClose}>Start</button>
    </div>
  );
}

export default PopUpMessage;
