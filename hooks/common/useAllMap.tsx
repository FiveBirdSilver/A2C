/// <reference types="navermaps" />

import { useEffect, useRef, useCallback, useState } from 'react'
import { mapInstance } from '@/libs/apis/instance'
import useCurrentLocation from '@/hooks/common/useCurrentLocation'
import debounce from 'lodash/debounce'

interface IMapList {
  addr: string
  id: string
  info?: string
  img: string
  lat: number
  lng: number
  name: string
  road_addr: string
  tel: string
}

const useAllMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  // 지도 객체 저장
  const mapInstanceRef = useRef<naver.maps.Map | null>(null)

  const markersRef = useRef<
    Array<{
      marker: naver.maps.Marker
      listener: naver.maps.MapEventListener
    }>
  >([])

  // 현재 내 위치 및 사각형 초기 데이터
  const { location, bound } = useCurrentLocation()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [selectPlace, setSelectPlace] = useState<IMapList>()

  // 리스트 가져오는 API
  const getMapList = useCallback(
    async (northEast: naver.maps.LatLng, southWest: naver.maps.LatLng) => {
      try {
        const response = await mapInstance.get<IMapList[]>(
          `/map/GetClimbPlace?northEast=${northEast.lng()},${northEast.lat()}&southWest=${southWest.lng()},${southWest.lat()}`
        )
        setLoading(false)
        return response.data
      } catch (error) {
        console.error(error)
        setError(true)
        return []
      }
    },
    []
  )

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    debounce((location: IMapList, map: naver.maps.Map) => {
      const newCenter = new window.naver.maps.LatLng(location.lat, location.lng)
      map.panTo(newCenter)
      map.setZoom(15)
      setSelectPlace(location)
    }, 300),
    []
  )

  // 위치에 따른 마커 업데이트
  const updateMarkers = useCallback(
    (map: naver.maps.Map, markers: IMapList[]) => {
      const bounds = map.getBounds()

      markers.forEach((markerData: IMapList) => {
        const position = new window.naver.maps.LatLng(
          markerData.lat,
          markerData.lng
        )

        // 현재 영역에 마커 생성
        if (bounds.hasPoint(position)) {
          const marker = new window.naver.maps.Marker({
            position,
            map,
            title: markerData.name,
            // icon: {
            //   url: 'https://a2-c.vercel.app/logo.jpeg',
            //   size: new naver.maps.Size(32, 32), // 아이콘 크기
            //   origin: new naver.maps.Point(0, 0),
            // },
          })
          const listener = naver.maps.Event.addListener(marker, 'click', () =>
            handleMarkerClick(markerData, map)
          )

          markersRef.current.push({ marker, listener })
        }
      })

      // 기존 마커 제거
      return () => {
        markersRef.current.forEach(({ marker, listener }) => {
          marker.setMap(null)
          naver.maps.Event.removeListener(listener)
        })
        markersRef.current = []
      }
    },
    []
  )

  const handleMapUpdate = useCallback(
    debounce(async () => {
      if (!mapInstanceRef.current) return
      const bounds = mapInstanceRef.current.getBounds()
      const northEast = new naver.maps.LatLng(
        bounds.getMax().y,
        bounds.getMax().x
      )
      const southWest = new naver.maps.LatLng(
        bounds.getMin().y,
        bounds.getMin().x
      )
      const data = await getMapList(northEast, southWest)
      updateMarkers(mapInstanceRef.current, data)
    }, 100),
    [getMapList, updateMarkers, setLoading]
  )

  useEffect(() => {
    if (!mapRef.current || !location || !bound) return

    const { naver } = window

    mapInstanceRef.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(location.lat, location.lng),
      zoom: 15,
    })

    handleMapUpdate()

    const listener = naver.maps.Event.addListener(
      mapInstanceRef.current,
      'idle',
      handleMapUpdate
    )

    return () => {
      if (listener) {
        naver.maps.Event.removeListener(listener)
      }
    }
  }, [location, bound, handleMapUpdate, setLoading])

  return { loading, error, mapRef, selectPlace }
}

export default useAllMap
