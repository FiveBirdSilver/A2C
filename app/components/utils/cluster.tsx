"use client";

import React from "react";
import { LayerProps, Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { FeatureCollection } from "geojson";

interface IClusterMapProps {
  data: FeatureCollection;
}

const ClusterMap = (props: IClusterMapProps) => {
  const data = props.data;

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

  return (
    <>
      <Source
        id="fivebirdsilver_test"
        type="geojson"
        // data="https://docs.mapbox.com/mapbox-gl-js/assets/fivebirdsilver_test.geojson"
        data={data}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </>
  );
};

export default React.memo(ClusterMap);
