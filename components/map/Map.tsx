"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";
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
