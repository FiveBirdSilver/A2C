"use client";

import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import geo from "../../../example/geo.json";

export default function Leaflet() {
  const geoData = geo as GeoJSON.FeatureCollection<any>;

  return (
    <MapContainer className={"leaflet"} center={[36.36675, 127.57842]} zoom={7} scrollWheelZoom>
      {/* <TileLayer
        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_LEAFELT_ACCESSTOKEN}`}
      /> */}
      <TileLayer
        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=${process.env.NEXT_PUBLIC_LEAFELT_ACCESSTOKEN}`}
      />
      <GeoJSON data={geoData} />
    </MapContainer>
  );
}

{
  /* <TileLayer
        attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}.png?access-token=${process.env.NEXT_PUBLIC_MAP_ACCESSTOKEN}`}
      /> */
}
