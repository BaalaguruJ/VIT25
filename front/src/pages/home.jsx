import React, { useState, useEffect } from 'react';
import NavBar from '../components/navbar';
import './home.css';
import './leaves.js';


function Home() {
  const [showHomePage, setShowHomePage] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowWelcome(false);
      setTimeout(() => {
        setShowHomePage(true);
      }, 1000);
    }, 3000);
  }, []);

  const handleBoxClick = (boxId) => {
    window.location.href = `/${boxId}`;
  };

  return (
    <>
   
    <div className="Home">
     
      {showWelcome && <div className="welcome-animation">Welcome to Cropcare</div>}
      {showHomePage && (
        <>
         <NavBar/>
          <div className="title">Cropcare</div>
          <div className="box-container">
            <div className="box" onClick={() => handleBoxClick('rover1')}>Rover 1</div>
            <div className="box" onClick={() => handleBoxClick('rover2')}>Rover 2</div>
            <div className="box" onClick={() => handleBoxClick('rover3')}>Rover 3</div>
            <div className="box" onClick={() => handleBoxClick('rover4')}>Rover 4</div>
            <div className="box" onClick={() => handleBoxClick('rover5')}>Rover 5</div>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default Home;
