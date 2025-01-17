import { useEffect, useRef } from 'react'

interface IMap {
  name: string
  lat: number
  lng: number
}

const useBoardMap = ({ name, lat, lng }: IMap) => {
  const mapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const { naver } = window
    if (mapRef.current && naver) {
      const center = new naver.maps.LatLng(lat, lng)
      const map = new naver.maps.Map(mapRef.current, {
        center: center,
        zoom: 15,
      })

      // 마커 생성
      new naver.maps.Marker({
        position: center,
        map: map,
        title: name,
      })

      // 현재 `fitBounds`를 사용하지 않음
      const bounds = new naver.maps.LatLngBounds(center, center)
      bounds.extend(center)
      map.fitBounds(bounds)
    }
  }, [lat, lng])

  return { mapRef }
}

export default useBoardMap
