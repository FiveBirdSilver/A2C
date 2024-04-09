import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/utils/map"), { ssr: false });

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full h-full font-PretendardM">
      <div className="flex justify-between w-3/4 bg-white h-2/3 rounded-2xl ">
        <div className="w-2/3">
          <Map />
        </div>
      </div>
    </div>
  );
}
