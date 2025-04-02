import React, { useState, useEffect } from 'react';
import './home.css'; 
import NavBar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import botGif from './white-bot-unscreen.gif'; // Ensure the path is correct
import socket from '../socket';

function Home() {
  const [showGif, setShowGif] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowWelcome(true); // Show welcome text
  //     setTimeout(() => {
  //       setShowSlogan(true); // Show slogan
  //       setTimeout(() => {
  //         setShowGif(false);
  //         setShowWelcome(false);
  //         setShowSlogan(false);
  //         setShowHomePage(true); // Show main page
  //       }, 2000); // Wait 2 seconds before going to main content
  //     }, 2000);
  //   }, 2000); // 2 seconds after GIF appears, text appears
  // }, []);

  const navigate = useNavigate();

  const handleBoxClick = (boxId) => {
    navigate(`/rover/${boxId}`);
  };

  return (
    <div className="Home">
      {/* {showGif && (
        <div className="welcome-container">
          <img src={botGif} alt="Loading..." className="full-width-gif" />
          {showWelcome && <div className="welcome-animation">Welcome to Cropcare</div>}
          {showSlogan && <div className="slogan-animation">Helping crops live their best life</div>}
        </div>
      )} */}

      {/* {showHomePage && ( */}
        <>
          <NavBar />
          <div className="title">Cropcare</div>
          <div className="box-container">
            {[1, 2, 3, 4, 5].map((id) => (
              <div key={id} className="box" onClick={() => handleBoxClick(id)}>
                Rover {id}
              </div>
            ))}
          </div>
        </>
      {/* )} */}
    </div>
  );
}

export default Home;
