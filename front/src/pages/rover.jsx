import React, { useState, useEffect } from 'react';
import './rover.css';
import NavBar from '../components/navbar';
import DummyMap from '../components/DummyMap';
import {io} from 'socket.io-client'
import {useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
const navigate = useNavigate();
  const {param} = useParams()
  const[batteryLevel, setBatteryLevel] = useState(0);
  const[sensorData, setSensorData] = useState(null)
  const[roverName, setRoverName] = useState(null)
  const[loc, setLoc] = useState({
    x : 0,
    y : 0
  })
  const[id, setId] = useState(null)
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setRoverData(prev => ({
    //     ...prev,
    //     battery: Math.max(0, prev.battery - 0.5),
    //     soilMoisture: Math.max(10, Math.min(90, prev.soilMoisture + (Math.random() * 4 - 2))),
    //     temperature: Math.max(20, Math.min(40, prev.temperature + (Math.random() * 2 - 1))),
    //     lastUpdate: new Date().toISOString()
    //   }));
    // }, 5000);

    // return () => clearInterval(interval);

    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      setId(socket.id)
    })
    socket.emit('roNo', param)
    socket.on('getSession', async(id) => {
      console.log(id)
    })

    socket.on('batteryLevel', data => {
        setBatteryLevel(data.battery_level)
        setRoverName(data.rover_id)
        console.log(roverName)
    })

    socket.on('sensorData', data => {
      setSensorData(data);
      console.log(data)
    })

    socket.on('roverPosition', data => {
      console.log(data)
      setLoc({
        x : data.coordinates[0],
        y : data.coordinates[1]
      })
    })
    return () => socket.disconnect()
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
            <h2 className='text-white'>Rover {param}</h2>
            <p>
            <span className={`status-indicator ${roverData.status}`}></span>
            Status: {batteryLevel}
            </p>
            <div className="battery-meter">
            <div className="battery-level" style={{ width: `${batteryLevel}%` }}></div>
            <span>{batteryLevel}%</span>
            </div>
            <p>Last Update: {new Date(sensorData && sensorData.timestamp).toLocaleTimeString()}</p>
            <button 
                className="rover-controls-button"
                onClick={() => navigate('/rover-controls')}
              >
              Open Rover Controls
            </button>
        </div>
        </div>
        <div className='content-scrollable'>
              <div className="rover-details">
                <h1>Crop & Soil Monitoring Dashboard</h1>
                
                <div className="dashboard-section">
                  <h2>Sensor Data</h2>
                  <div className="metrics-grid">
                    <MetricCard title="Soil Moisture" value={`${sensorData ? sensorData.soil_moisture: 0} %VWC`} />
                    <MetricCard title="Soil Ph" value={`${sensorData ? sensorData.soil_pH : 0}`}  />
                    <MetricCard title="Temperature" value={`${sensorData ? sensorData.temperature : 0}°C`} />
                    <MetricCard title="Sensor Battery level" value={`${sensorData ? sensorData.battery_level : 0}%`} icon="🔋" />
                  </div>
                </div>

                {/* <div className="dashboard-section">
                  <h2>Soil Analysis</h2>
                  <div className="metrics-grid">
                    <MetricCard title="Moisture" value={`${roverData.soilMoisture}%`} icon="🌱" />
                    <MetricCard title="Nitrogen" value={`${roverData.nutrients.nitrogen} ppm`} icon="🧪" />
                    <MetricCard title="Phosphorus" value={`${roverData.nutrients.phosphorus} ppm`} icon="🧪" />
                    <MetricCard title="Potassium" value={`${roverData.nutrients.potassium} ppm`} icon="🧪" />
                  </div>
                </div> */}

                <div className="dashboard-section">
                  <h2>Location</h2>
                  <div className="location-data">
                    <p>Latitude: {loc.x}</p>
                    <p>Longitude: {loc.y}</p><br />
                    <p>Heading: {roverData.location.heading}</p>
                  </div>
                  <div className="map-placeholder h-[500px] mt-[350px] mb-8">
                    {/* <DummyMap/> */}
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