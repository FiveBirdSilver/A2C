"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function Map() {
  return (
    <MapContainer className={"leaflet"} center={[37.56675, 126.97842]} zoom={7}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
