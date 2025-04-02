import React, { useEffect, useState } from 'react';
import './RoverControls.css';
import socket from '../socket';
import { useParams } from 'react-router-dom';

function RoverControls() {
  const [movement, setMovement] = useState([]);
  const { param } = useParams();
  const sessionId = localStorage.getItem('sessionID');

  useEffect(() => {
    socket.connect();

    socket.on('direction', (message) => {
      setMovement((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMovement = (direction) => {
    console.log(`Moving ${direction}`);
    socket.emit('operate', direction, param, sessionId);
  };

  const handleStop = () => {
    setMovement([]);
    console.log('Stopping movement');
  };

  return (
    <div className='flex flex-col gap-12 justify-center items-center m-4'>
      <div className="rover-controls">
        <h2>Rover Controls</h2>
        <div className="control-grid">
          <button className="control-btn forward" onClick={() => handleMovement(1)}>↑</button>
          <button className="control-btn left" onClick={() => handleMovement(3)}>←</button>
          <button className="control-btn stop" onClick={handleStop}>●</button>
          <button className="control-btn right" onClick={() => handleMovement(4)}>→</button>
          <button className="control-btn backward" onClick={() => handleMovement(2)}>↓</button>
        </div>
      </div>
      <div className='h-[400px] w-[260px] overflow-auto bg-white p-2 rounded-2xl'>
        {movement.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
}

export default RoverControls;