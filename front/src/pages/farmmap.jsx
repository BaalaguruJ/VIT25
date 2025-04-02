import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ccIcon from '/drone.png'; 

function SetViewOnNewPosition({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.panTo(coordinates); 
    }
  }, [coordinates, map]);

  return null;
}

function FarmMap({ coordinates }) {
  const zoom = 14; 

  const clampedX = Math.max(0, Math.min(500, coordinates[0]));
  const clampedY = Math.max(0, Math.min(500, coordinates[1]));

  const mappedCoordinates = [
    ((clampedX / 500) * (11.8 - 10.5)) + 10.5,
    ((clampedY / 500) * (79.2 - 78.0)) + 78.0
  ];

  return (
    <div className="m-4">
      <MapContainer
        center={mappedCoordinates}
        zoom={zoom}
        style={{ height: '500px', width: '100%' }}
        maxZoom={15}
        minZoom={10}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <SetViewOnNewPosition coordinates={mappedCoordinates} />
        
        <Marker position={mappedCoordinates} icon={L.icon({ iconUrl: ccIcon, iconSize: [32, 32] })}>
          <Popup>
            <span>Rover Location: {clampedX}, {clampedY}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default FarmMap;
