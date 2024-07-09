"use client";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";

//모듈이 클라이언트 번들의 일부로 간주
export default function Login() {
  const router = useRouter();

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
    <div className="flex flex-col items-center gap-5">
      <Button variant="outline" onClick={() => router.push("/view")}>
        지도 뷰어
      </Button>
      <Button variant="outline" onClick={() => router.push("/login")}>
        로그인
      </Button>
    </div>
  );
}
