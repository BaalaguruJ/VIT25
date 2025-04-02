import React, { useState, useEffect } from 'react';
import './rover.css';
import NavBar from '../components/navbar';
import DummyMap from '../components/DummyMap';
import { io } from 'socket.io-client'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n';
import LanguageSwitcher from '../components/LanguageSwitcher';
import socket from '../socket';
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
  const { param } = useParams()
  const [batteryLevel, setBatteryLevel] = useState(0);
  const { t } = useTranslation();
  const [sensorData, setSensorData] = useState(null)
  const [roverName, setRoverName] = useState(null)
  const [loc, setLoc] = useState({
    x: 0,
    y: 0
  })
  const getStatus = (type, value) => {
    if (value === undefined || value === null) return 'neutral';

    switch (type) {
      case 'moisture':
        if (value < 10) return 'critical';    // Too dry
        if (value < 20) return 'warning';
        if (value > 80) return 'critical';    // Too wet
        if (value > 60) return 'warning';
        return 'good';

      case 'ph':
        if (value < 4.5 || value > 8.5) return 'critical';
        if (value < 5.5 || value > 7.5) return 'warning';
        return 'good';

      case 'temperature':
        if (value < 5 || value > 35) return 'critical';
        if (value < 10 || value > 30) return 'warning';
        return 'good';

      case 'battery':
        if (value < 10) return 'critical';
        if (value < 20) return 'warning';
        return 'good';

      default:
        return 'neutral';
    }
  }
  const [id, setId] = useState(null)
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
    socket.connect();
    socket.emit('roNo', param);
  
    const handleSession = (id) => {
      console.log(id);
      localStorage.setItem('sessionID', id);
    };
    socket.on('getSession', async (id) => {
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
        x: data.coordinates[0],
        y: data.coordinates[1]
      })
    })


    return () => socket.disconnect()
  }, []);

  return (

    <>
      <NavBar />
      <LanguageSwitcher />
      <div className="dashboard-container">
        
        <div className="rover-display-fixed">
          <img
            src="/bot-removebg-preview.png"
            alt="Agricultural Rover"
            className="rover-image"
          />
          <div className="rover-status">
            <h2 className='text-white'>{t('rover.rover')} {param}</h2>
            <p>
              <span className={`status-indicator ${roverData.status}`}></span>
              {t('rover.battery')}: {batteryLevel}
            </p>
            <div className="battery-meter">
              <div className="battery-level" style={{ width: `${batteryLevel}%` }}></div>
              <span>{batteryLevel}%</span>
            </div>
            <p>{t('rover.lastUpdate')}: {new Date(sensorData && sensorData.timestamp).toLocaleTimeString()}</p>
            <button
              className="rover-controls-button"
              onClick={() => navigate('/rover-controls')}
            >
              {t('rover.controls')}
            </button>
          </div>
        </div>
        <div className='content-scrollable'>
          <div className="rover-details">
            <h1>{t('dashboard.title')}</h1>
            <div className="dashboard-section">
              <h2>{t('dashboard.sensorData')}</h2>
              <div className="metrics-grid">
                <MetricCard
                  title={t('metrics.soilMoisture')}
                  value={`${sensorData ? sensorData.soil_moisture : 0} %VWC`}
                  icon="🌱"
                  status={getStatus('moisture', sensorData?.soil_moisture)}
                />
                <MetricCard
                  title={t('metrics.soilPh')}
                  value={`${sensorData ? sensorData.soil_pH : 0}`}
                  icon="🧪"
                  status={getStatus('ph', sensorData?.soil_pH)}
                />
                <MetricCard
                  title={t('metrics.temperature')}
                  value={`${sensorData ? sensorData.temperature : 0}°C`}
                  icon="🌡️"
                  status={getStatus('temperature', sensorData?.temperature)}
                />
                <MetricCard
                  title={t('metrics.sensorBattery')}
                  value={`${sensorData ? sensorData.battery_level : 0}%`}
                  icon="🔋"
                  status={getStatus('battery', sensorData?.battery_level)}
                />
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
              <h2>{t('dashboard.location')}</h2>
              <div className="location-data">
                <p>{t('rover.latitude')}: {loc.x}</p>
                <p>{t('rover.longitude')}: {loc.y}</p><br />
                <p>{t('dashboard.heading')}: {roverData.location.heading}</p>
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

function MetricCard({ title, value, icon, status = 'neutral' }) {
  return (
    <div className={`metric-card ${status}`}>
      {icon && <div className="metric-icon">{icon}</div>}
      <h3>{title}</h3>
      <p className="metric-value">{value}</p>
    </div>
  );
}

export default Rover