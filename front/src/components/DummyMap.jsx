import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const DummyMap = () => {
  // Default coordinates (you can replace these with rover coordinates)
  const coordinates = [9, -1]; 

  return (
    <MapContainer center={coordinates} zoom={15} style={{ height: '500px', width: '100%' }}>
      {/* OpenStreetMap tiles */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coordinates}>
        <Popup>Rover-1 at ({coordinates[0]}, {coordinates[1]})</Popup>
      </Marker>
    </MapContainer>
  );
};

export default DummyMap;