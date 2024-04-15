"use client";

import { useCallback, useRef } from "react";
import { CircleLayer, FillLayer, GeoJSONSource, Layer, LayerProps, Map, MapRef, Source } from "react-map-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import type { FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

import geo from "../../../example/geo.json";
export default function MapBox() {
  const geojson = geo as FeatureCollection;
  const mapRef = useRef<MapRef>(null);

  // 대한민국 바운더리
  const koreaBounds = [
    [124.25, 33.0], // 대한민국 경계의 서쪽 경도와 남쪽 위도
    [131.88, 38.6], // 대한민국 경계의 동쪽 경도와 북쪽 위도
  ];

  const clusterLayer: LayerProps = {
    id: "clusters",
    type: "circle",
    source: "fivebirdsilver_test",
    filter: ["has", "point_count"],
    paint: {
      "circle-color": ["step", ["get", "point_count"], "#eb7878", 10, "#a55454", 20, "#f28cb1"],
      "circle-radius": ["step", ["get", "point_count"], 20, 10, 30, 20, 40], //클러스터의 포인트 수가 10 미만이면 20, 10 이상 20 미만이면 30, 20 이상이면 40의 반지름이 적용됩니다.
    },
  };

  const clusterCountLayer: LayerProps = {
    id: "cluster-count",
    type: "symbol",
    source: "fivebirdsilver_test",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  };

  const unclusteredPointLayer: LayerProps = {
    id: "unclustered-point",
    type: "circle",
    source: "fivebirdsilver_test",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#f5bcbc",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  };

  const handleOnClusterClick = (event: any) => {
    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

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
        interactiveLayerIds={[clusterLayer.id as string]}
        onRender={onRender}
        onClick={handleOnClusterClick}
        ref={mapRef}
        minZoom={5}
      >
        <Source
          id="fivebirdsilver_test"
          type="geojson"
          // data="https://docs.mapbox.com/mapbox-gl-js/assets/fivebirdsilver_test.geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
}
