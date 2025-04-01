import React, { useState, useEffect } from 'react';
import './home.css'; // Import the leaf animation script
import NavBar from '../components/navbar'
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showHomePage, setShowHomePage] = useState(!false);
  const [showWelcome, setShowWelcome] = useState(!true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowWelcome(false);
  //     setTimeout(() => {
  //       setShowHomePage(true);
  //     }, 1000);
  //   }, 3000);
  // }, []);

  const navigate = useNavigate()

  const handleBoxClick = (boxId) => {
    navigate(`/rover/${boxId}`)
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
            <div className="box" onClick={() => handleBoxClick(1)}>Rover 1</div>
            <div className="box" onClick={() => handleBoxClick(2)}>Rover 2</div>
            <div className="box" onClick={() => handleBoxClick(3)}>Rover 3</div>
            <div className="box" onClick={() => handleBoxClick(4)}>Rover 4</div>
            <div className="box" onClick={() => handleBoxClick(5)}>Rover 5</div>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default Home;