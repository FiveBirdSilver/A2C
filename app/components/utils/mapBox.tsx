"use client";

import { useCallback, useRef, useState } from "react";
import { GeoJSONSource, Map, MapRef } from "react-map-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import type { FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

import geojson from "../../../example/geo.json";
import geoCity from "../../../example/geo_city.json";
import dynamic from "next/dynamic";

interface IProps {
  type: string;
}

const MarkerMap = dynamic(() => import("../../components/utils/marker"), { ssr: false });
const ClusterMap = dynamic(() => import("../../components/utils/cluster"), { ssr: false });

export default function MapBox(props: IProps) {
  const type = props.type;
  const mapRef = useRef<MapRef>(null);

  // 대한민국 바운더리
  const koreaBounds = [
    [124.25, 33.0], // 대한민국 경계의 서쪽 경도와 남쪽 위도
    [131.88, 38.6], // 대한민국 경계의 동쪽 경도와 북쪽 위도
  ];

  // cluster 클릭
  const handleOnClusterClick = (event: any) => {
    if (event.features.length !== 0) {
      const feature = event.features[0];

      const clusterId = feature.properties?.cluster_id;

      const mapboxSource = mapRef.current?.getSource("fivebirdsilver_test") as GeoJSONSource;

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
        mapRef.current?.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,
        });
      });
    }
  };

  // 한글 패치
  const onRender = useCallback((e: any) => {
    e.target.addControl(new MapboxLanguage({ defaultLanguage: "ko" }));
  }, []);

  return (
    <>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESSTOKEN}
        initialViewState={{
          longitude: 127.57842,
          latitude: 36.36675,
          zoom: 6,
        }}
        style={{ width: "100%", height: "100%" }}
        // mapStyle="mapbox://styles/mapbox/streets-v11"
        mapStyle="mapbox://styles/mapbox/light-v11"
        interactiveLayerIds={["clusters"]}
        onRender={onRender}
        onClick={handleOnClusterClick}
        ref={mapRef}
        minZoom={5}
      >
        {type === "cluster" ? <ClusterMap data={geojson as FeatureCollection} /> : <MarkerMap data={geoCity} />}
        {/* {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.city}, {popupInfo.state} |{" "}
                <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a>
              </div>
              <img width="100%" src={popupInfo.image} />
            </Popup>
          )} */}
      </Map>
    </>
  );
}
