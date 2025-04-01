import React, { useState, useEffect } from 'react';
import './Home.css'; // Ensure you have the appropriate CSS file for Home

function Home() {
  const [showHomePage, setShowHomePage] = useState(false);

  useEffect(() => {
    // Set timeout to show the homepage content after 3 seconds
    setTimeout(() => {
      setShowHomePage(true);
    }, 3000); // Delay in milliseconds (3 seconds)
  }, []);

  const handleBoxClick = (boxId) => {
    // Navigate to different rover pages based on box clicked
    window.location.href = `/${boxId}`;
  };

  return (
    <div className="Home">
      {/* Image Fade-In */}
      <div className="image-container">
        <img src="crop.png" alt="Cropcare" /> {/* Add your image path here */}
      </div>

      {/* After 3 seconds, show the homepage content */}
      {showHomePage && (
        <>
          {/* "Cropcare" Text Animation */}
          <div className="title">Cropcare</div>

          {/* Boxes with hover animation */}
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
  );
}

export default Home;
