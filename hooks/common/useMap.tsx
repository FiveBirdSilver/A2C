import { useEffect, useState, useRef } from 'react'

interface IMap {
  name: string
  lat: number
  lng: number
}

const useMap = ({ name, lat, lng }: IMap) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [bounds, setBounds] = useState({
    northEast: { lat: 0, lng: 0 },
    southWest: { lat: 0, lng: 0 },
  })
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
      // const bounds = new naver.maps.LatLngBounds(center, center)
      // bounds.extend(center)
      // map.fitBounds(bounds)

      // 지도 범위 업데이트
      const updateBounds = () => {
        const currentBounds = map.getBounds()
        const northEast = currentBounds.getMax()
        const southWest = currentBounds.getMin()
        setBounds({
          northEast: { lat: northEast.y, lng: northEast.x },
          southWest: { lat: southWest.y, lng: southWest.x },
        })
      }

      updateBounds()
      naver.maps.Event.addListener(map, 'bounds_changed', updateBounds)
    }
  }, [lat, lng])

  return { mapRef, bounds }
}

export default useMap
