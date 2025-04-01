import React, { useState, useEffect } from 'react';
import './rover.css';
import NavBar from '../components/navbar';
import DummyMap from '../components/DummyMap';

function Rover() {
  const [roverData, setRoverData] = useState({
    status: 'active',
    battery: 87,
    speed: 2.4,
    temperature: 32,
    humidity: 45,
    soilMoisture: 62,
    nutrients: {
      nitrogen: 45,
      phosphorus: 32,
      potassium: 28
    },
    location: {
      lat: 37.7749,
      lng: -122.4194,
      heading: 'NW'
    },
    lastUpdate: new Date().toISOString()
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoverData(prev => ({
        ...prev,
        battery: Math.max(0, prev.battery - 0.5),
        soilMoisture: Math.max(10, Math.min(90, prev.soilMoisture + (Math.random() * 4 - 2))),
        temperature: Math.max(20, Math.min(40, prev.temperature + (Math.random() * 2 - 1))),
        lastUpdate: new Date().toISOString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
   
    <>
     <NavBar/>
    <div className="dashboard-container">
        <div className="rover-display-fixed">
            <img 
                src="/bot-removebg-preview.png" 
                alt="Agricultural Rover" 
                className="rover-image" 
            />
            <div className="rover-status">
            <h2>Rover X-247</h2>
            <p>
            <span className={`status-indicator ${roverData.status}`}></span>
            Status: {roverData.status.toUpperCase()}
            </p>
            <div className="battery-meter">
            <div className="battery-level" style={{ width: `${roverData.battery}%` }}></div>
            <span>{roverData.battery}%</span>
            </div>
            <p>Last Update: {new Date(roverData.lastUpdate).toLocaleTimeString()}</p>
        </div>
        </div>
<div className='content-scrollable'>
      <div className="rover-details">
        <h1>Crop & Soil Monitoring Dashboard</h1>
        
        <div className="dashboard-section">
          <h2>Operational Metrics</h2>
          <div className="metrics-grid">
            <MetricCard title="Speed" value={`${roverData.speed} km/h`} icon="🚀" />
            <MetricCard title="Temperature" value={`${roverData.temperature}°C`} icon="🌡️" />
            <MetricCard title="Humidity" value={`${roverData.humidity}%`} icon="💧" />
            <MetricCard title="Battery" value={`${roverData.battery}%`} icon="🔋" />
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Soil Analysis</h2>
          <div className="metrics-grid">
            <MetricCard title="Moisture" value={`${roverData.soilMoisture}%`} icon="🌱" />
            <MetricCard title="Nitrogen" value={`${roverData.nutrients.nitrogen} ppm`} icon="🧪" />
            <MetricCard title="Phosphorus" value={`${roverData.nutrients.phosphorus} ppm`} icon="🧪" />
            <MetricCard title="Potassium" value={`${roverData.nutrients.potassium} ppm`} icon="🧪" />
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Location</h2>
          <div className="location-data">
            <p>Latitude: {roverData.location.lat}</p>
            <p>Longitude: {roverData.location.lng}</p>
            <p>Heading: {roverData.location.heading}</p>
          </div>
          <div className="map-placeholder">
            <DummyMap/>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
}

function MetricCard({ title, value, icon }) {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="metric-value">{value}</p>
    </div>
  );
}

export default Rover;