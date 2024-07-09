"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CustomSelect } from "app/components/elements/select";

const Leaflet = dynamic(() => import("../../components/utils/leaflet"), { ssr: false });
const Mapbox = dynamic(() => import("../../components/utils/mapBox"), { ssr: false });

export default function Page() {
  const [type, setType] = useState<string>("marker");

  const handleOnClick = (e: any) => {
    setType(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-PretendardM">
      <div className="flex items-start w-3/4 gap-3 mb-1">
        <CustomSelect />
        {/* <button value={"cluster"} onClick={(e) => handleOnClick(e)} className={`${type === "cluster" && "underline"}`}>
          CLUSTER
        </button>
        <span>|</span>
        <button value={"marker"} onClick={(e) => handleOnClick(e)} className={`${type === "marker" && "underline"}`}>
          MARKER
        </button> */}
      </div>
      <div className="flex justify-between w-3/4 bg-white rounded-2xl h-4/5">
        <div className="w-2/3">
          {/* <Leaflet /> */}
          <Mapbox type={type} />
        </div>
      </div>
    </div>
  );
}
