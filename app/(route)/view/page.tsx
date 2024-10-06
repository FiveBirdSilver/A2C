'use client'

export default function Page() {
  // const mapRef = useRef(null);
  // const lat = 37.55395662140252;
  // const lng = 126.9923164220069;

  // useEffect(() => {
  //   const { naver } = window;
  //   if (mapRef.current && naver) {
  //     const location = new naver.maps.LatLng(lat, lng);
  //     const map = new naver.maps.Map(mapRef.current, {
  //       center: location,
  //       zoom: 17,
  //     });
  //     new naver.maps.Marker({
  //       position: location,
  //       map,
  //  s   });
  //   }
  // }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full font-PretendardM'>
      <div className='flex items-start w-3/4 gap-3 mb-1'></div>
      <div className='flex justify-between w-3/4 bg-white rounded-2xl h-4/5'></div>
    </div>
  )
}
