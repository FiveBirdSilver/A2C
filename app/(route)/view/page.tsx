import dynamic from "next/dynamic";

const Leaflet = dynamic(() => import("../../components/utils/leaflet"), { ssr: false });
const Mapbox = dynamic(() => import("../../components/utils/mapBox"), { ssr: false });

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-PretendardM">
      <div className="flex items-start w-3/4 gap-3">
        <button>CLUSTER</button>
        <button>MARKER</button>
      </div>
      <div className="flex justify-between w-3/4 bg-white h-2/3 rounded-2xl ">
        <div className="w-2/3">
          {/* <Leaflet /> */}
          <Mapbox />
        </div>
      </div>
    </div>
  );
}
