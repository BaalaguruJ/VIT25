import React, { useState } from 'react';
import './RoverControls.css';

function RoverControls() {
  const [movement, setMovement] = useState('');

  const handleMovement = (direction) => {
    setMovement(direction);
    console.log(`Moving ${direction}`);
  };

  const handleStop = () => {
    setMovement('');
    console.log('Stopping movement');
  };

  return (
    <div className="rover-controls">
      <h2>Rover Controls</h2>
      <div className="control-grid">
        <button 
          className={`control-btn forward ${movement === 'forward' ? 'active' : ''}`}
          onMouseDown={() => handleMovement('forward')}
          onMouseUp={handleStop}
          onTouchStart={() => handleMovement('forward')}
          onTouchEnd={handleStop}
        >
          ↑
        </button>

        {/* Left Button */}
        <button 
          className={`control-btn left ${movement === 'left' ? 'active' : ''}`}
          onMouseDown={() => handleMovement('left')}
          onMouseUp={handleStop}
          onTouchStart={() => handleMovement('left')}
          onTouchEnd={handleStop}
        >
          ←
        </button>

        {/* Stop Button */}
        <button 
          className="control-btn stop"
          onClick={handleStop}
        >
          ●
        </button>

        {/* Right Button */}
        <button 
          className={`control-btn right ${movement === 'right' ? 'active' : ''}`}
          onMouseDown={() => handleMovement('right')}
          onMouseUp={handleStop}
          onTouchStart={() => handleMovement('right')}
          onTouchEnd={handleStop}
        >
          →
        </button>

        {/* Backward Button */}
        <button 
          className={`control-btn backward ${movement === 'backward' ? 'active' : ''}`}
          onMouseDown={() => handleMovement('backward')}
          onMouseUp={handleStop}
          onTouchStart={() => handleMovement('backward')}
          onTouchEnd={handleStop}
        >
          ↓
        </button>
      </div>
      
      <div className="status">
        Current Command: {movement || 'Stopped'}
      </div>
    </div>
  );
}

export default RoverControls;