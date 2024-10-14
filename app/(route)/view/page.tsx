'use client'

import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const mapRef = useRef(null)

  // 초기 경계 설정
  const [bounds, setBounds] = useState({
    northEast: { lat: 0, lng: 0 },
    southWest: { lat: 0, lng: 0 },
  })

  const data = [
    { name: '골든플래닛', lat: 37.5058315272521, lng: 127.040806473603 },
    { name: '센터필드', lat: 37.5028813541774, lng: 127.041356540268 },
  ]

  useEffect(() => {
    const { naver } = window
    if (mapRef.current && naver) {
      const center = new naver.maps.LatLng(data[0].lat, data[0].lng)
      const map = new naver.maps.Map(mapRef.current, {
        center: center,
        zoom: 15,
      })

      // 모든 위치에 마커 생성
      data.forEach((location) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(location.lat, location.lng),
          map: map,
        })
      })

      // 모든 마커가 보이도록 지도 범위 조정
      if (data.length > 1) {
        const sw = new naver.maps.LatLng(data[0].lat, data[0].lng)
        const ne = new naver.maps.LatLng(data[0].lat, data[0].lng)
        const bounds = new naver.maps.LatLngBounds(sw, ne)

        data.forEach((location) => {
          bounds.extend(new naver.maps.LatLng(location.lat, location.lng))
        })
        map.fitBounds(bounds)
      }

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
  }, [])

  console.log(bounds)
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div ref={mapRef} className='w-full h-full'></div>
    </div>
  )
}
