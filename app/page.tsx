"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

//모듈이 클라이언트 번들의 일부로 간주
export default function Login() {
  const router = useRouter();

  const mapRef = useRef(null);
  const lat = 37.55395662140252;
  const lng = 126.9923164220069;

  useEffect(() => {
    const { naver } = window;
    if (mapRef.current && naver) {
      const location = new naver.maps.LatLng(lat, lng);
      const map = new naver.maps.Map(mapRef.current, {
        center: location,
        zoom: 17,
      });
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => router.push("/login")}>로그인</button>
      <button onClick={() => router.push("/register")}>회원가입</button>
      <button onClick={() => router.push("/order")} data-cy="orderBtn">
        주문
      </button>
      {/* <div ref={mapRef} style={{ width: 500, height: 500 }}></div> */}
    </div>
  );
}
