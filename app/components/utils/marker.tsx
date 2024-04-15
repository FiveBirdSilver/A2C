"use client";

import React, { useMemo } from "react";
import { FullscreenControl, GeolocateControl, ScaleControl, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Pin from "../elements/pin";

interface IMarker {
  city: string;
  tourist_attraction: string;
  latitude: number;
  longitude: number;
  image: string;
}

interface IMarkerMapProps {
  data: IMarker[];
}

const MarkerMap = ({ data }: IMarkerMapProps) => {
  const pins = useMemo(
    () =>
      data.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            // setMarker(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <>
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {pins}
    </>
  );
};

export default React.memo(MarkerMap);
