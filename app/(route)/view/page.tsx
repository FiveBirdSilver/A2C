'use client'

import { useEffect, useRef, useState } from 'react'
import { useQueries } from '@/hooks/queries/useQueries.tsx'

interface ICoordinate {
  id: string
  name: string
  tel: string
  addr: string
  road_addr: string
  img: string
  lat: number
  lng: number
}

export default function Page() {
  const mapRef = useRef(null)

  // 초기 경계 설정
  const [bounds, setBounds] = useState({
    northEast: { lat: 0, lng: 0 },
    southWest: { lat: 0, lng: 0 },
  })

  const getMapAll = useQueries<{ data: ICoordinate[] }>({
    queryKey: 'getMapAll',
    endpoint: `northEast=${bounds.northEast.lng},${bounds.northEast.lat}&southWest=${bounds.southWest.lng},${bounds.southWest.lat}`,
  })

  useEffect(() => {
    const { naver } = window
    if (mapRef.current && naver) {
      // if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const center = new naver.maps.LatLng(latitude, longitude)
          const map = new naver.maps.Map(mapRef.current!, {
            center: center,
            zoom: 15,
          })

          // 모든 위치에 마커 생성
          getMapAll.data?.data.forEach((location: ICoordinate) => {
            new naver.maps.Marker({
              position: new naver.maps.LatLng(location.lat, location.lng),
              map: map,
            })
          })

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
        },
        (error) => {
          console.error('Error getting location', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
    // }
  }, [])

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div ref={mapRef} className='w-full h-full'></div>
    </div>
  )
}

interface IMap {
  data: { name: string; lat: number; lng: number }[]
  standard: 'board' | 'location'
}
