import React, { useState, useEffect } from 'react';
import './rover.css';
import NavBar from '../components/navbar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import socket from '../socket';
import FarmMap from './farmmap';
import i18n from '../i18n';
function Rover() {
  const [alerts, setAlerts] = useState({
    critical: [],
    warning: []
  });
  const [showAlert, setShowAlert] = useState({
    critical: false,
    warning: false
  });

  const speakText = (message, lang = 'en') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
  
      // Set Tamil (`ta-IN`) or English (`en-US`) based on the selected language
      utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-US'; 
      
      utterance.rate = 1; // Adjust speed if needed
      utterance.onend = () => {
        if (onComplete) onComplete();  
      };
  
      speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-Speech not supported in this browser.');
      if (onComplete) onComplete(); 
    }
  };
  
  
  const checkForAlerts = (data, lang='en') => {
    if (!data) return;
  
    const newAlerts = {
      critical: [],
      warning: []
    };
    let ttsMessage = ''; // Stores the alert text for speech
  
    if (getStatus('moisture', data.soil_moisture) === 'critical') {
      newAlerts.critical.push(t('critical.soil'));
      newAlerts.critical.push(t('critical.soil-desc'));
      ttsMessage += `${t('critical.soil')}. ${t('critical.soil-desc')}. `;
    } else if (getStatus('moisture', data.soil_moisture) === 'warning') {
      newAlerts.warning.push(t('moderate.soil'));
      newAlerts.warning.push(t('moderate.soil-desc'));
      ttsMessage += `${t('moderate.soil')}. ${t('moderate.soil-desc')}. `;
    }
  
    if (getStatus('ph', data.soil_pH) === 'critical') {
      newAlerts.critical.push(t('critical.soil-ph'));
      ttsMessage += `${t('critical.soil-ph')}. `;
    } else if (getStatus('ph', data.soil_pH) === 'warning') {
      newAlerts.warning.push(t('moderate.soil-ph'));
      ttsMessage += `${t('moderate.soil-ph')}. `;
    }
  
    if (getStatus('temperature', data.temperature) === 'critical') {
      newAlerts.critical.push(t('critical.Temperature'));
      newAlerts.critical.push(t('critical.Tem-desc'));
      ttsMessage += `${t('critical.Temperature')}. ${t('critical.Tem-desc')}. `;
    } else if (getStatus('temperature', data.temperature) === 'warning') {
      newAlerts.warning.push(t('moderate.Temperature'));
      newAlerts.warning.push(t('moderate.Tem-desc'));
      ttsMessage += `${t('moderate.Temperature')}. ${t('moderate.Tem-desc')}. `;
    }
  
    if (getStatus('battery', data.battery_level) === 'critical') {
      newAlerts.critical.push(t('critical.battery'));
      newAlerts.critical.push(t('critical.bat-decs'));
      ttsMessage += `${t('critical.battery')}. ${t('critical.bat-decs')}. `;
    } else if (getStatus('battery', data.battery_level) === 'warning') {
      newAlerts.warning.push(t('moderate.battery'));
      newAlerts.warning.push(t('moderate.bat-decs'));
      ttsMessage += `${t('moderate.battery')}. ${t('moderate.bat-decs')}. `;
    }
  
    setAlerts(newAlerts);
  
    if (ttsMessage) {
      const selectedLang = i18n.language || 'en'; // Get selected language
speakText(ttsMessage, selectedLang);

    }
  
    if (newAlerts.critical.length > 0) {
      setShowAlert(prev => ({ ...prev, critical: true }));
      setTimeout(() => setShowAlert(prev => ({ ...prev, critical: false })), 8000);
    }
  
    if (newAlerts.warning.length > 0) {
      setShowAlert(prev => ({ ...prev, warning: true }));
      setTimeout(() => setShowAlert(prev => ({ ...prev, warning: false })), 8000);
    }
  };
  

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
  useEffect(() => {
    socket.connect();
    socket.emit('roNo', param);
  
    const handleSession = (id) => {
      console.log(id);
      localStorage.setItem('sessionID', id);
    };
  
    socket.on('getSession', handleSession);
  
    socket.on('batteryLevel', (data) => {
      setBatteryLevel(data.battery_level);
      setRoverName(data.rover_id);
    });
  
    socket.on('sensorData', (data) => {
      setSensorData(data);
      checkForAlerts(data);
    });

    socket.on('roverPosition', (data) => {
      setLoc({ x: data.coordinates[0], y: data.coordinates[1] });
    });
  
    return () => {
      socket.off('getSession', handleSession);
      socket.off('batteryLevel');
      socket.off('sensorData');
      socket.off('roverPosition');
      socket.disconnect();
    };
  }, [param]);

  return (

    <>
      <NavBar />
      {showAlert.critical && (
        <div className="critical-alert">
          <div className="alert-content">
            <h3>⚠️ {t('crit')}!</h3>
            {alerts.critical.map((alert, index) => (
              <p key={index}>{alert}</p>
            ))}
          </div>
        </div>
      )}
      {showAlert.warning && (
        <div className="alert-popup warning">
          <div className="alert-content">
            <h3>⚠️ {t('warn')}</h3>
            {alerts.warning.map((alert, index) => (
              <p key={index}>{alert}</p>
            ))}
          </div>
        </div>
      )}

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
              onClick={() => navigate(`/rover-controls/${param}`)}
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

            <div className="dashboard-section">
              <h2>{t('dashboard.location')}</h2>
              <div className="location-data">
                <p>{t('rover.latitude')}: {loc.x}</p>
                <p>{t('rover.longitude')}: {loc.y}</p><br />
                <p>{t('dashboard.heading')}: {roverData.location.heading}</p>
              </div>
              <div className="">
                <FarmMap coordinates={[loc.x, loc.y]}/>
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