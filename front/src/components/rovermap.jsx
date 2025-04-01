import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RoverMap from "../components/rovermap"
// Dummy coordinates for the rover and nearby objects
const roverPosition = { lat: 51.505, lng: -0.09 }; // Example rover coordinates
const nearbyObjects = [
  { lat: 51.5055, lng: -0.08, name: "Object 1" },
  { lat: 51.506, lng: -0.1, name: "Object 2" },
  { lat: 51.504, lng: -0.09, name: "Object 3" },
];

export default function RoverMap() {
  return (
    <MapContainer
      center={roverPosition}
      zoom={15}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      {/* TileLayer for the map's base layer (OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Marker for the rover's position */}
      <Marker position={roverPosition}>
        <Popup>
          <strong>Rover Location</strong>
          <br />
          Latitude: {roverPosition.lat}
          <br />
          Longitude: {roverPosition.lng}
        </Popup>
      </Marker>

      {/* Markers for nearby objects */}
      {nearbyObjects.map((object, index) => (
        <Marker key={index} position={{ lat: object.lat, lng: object.lng }}>
          <Popup>
            <strong>{object.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
