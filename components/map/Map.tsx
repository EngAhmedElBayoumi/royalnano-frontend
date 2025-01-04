"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";

import L from "leaflet";
// Import marker assets
import "leaflet/dist/leaflet.css";
// Fix missing marker icons
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], // default size
  iconAnchor: [12, 41], // anchor point
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
// Set the default icon globally
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  const position: [number, number] = [51.505, -0.09]; // Coordinates for the initial map center

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="h-[643px] w-[100%] z-0 rounded-16 border border-primary "
    >
      <TileLayer
        className="rounded-16"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
