/// <reference types="navermaps" />

/**
 * 네이버 지도 렌더링 하는 훅
 * @param lat - 위도
 * @param lng - 경도
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import debounce from 'lodash/debounce'

import useCurrentLocation from '@/hooks/common/useCurrentLocation.tsx'
import axios from 'axios'

export interface IMapList {
  addr: string
  id: string
  info?: string
  img: string
  lat: number
  lng: number
  name: string
  road_addr: string
  tel: string
  diff?: number
  rank?: number
}

interface IMapProps {
  lat?: number
  lng?: number
}

const useMap = ({ lat, lng }: IMapProps) => {
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
        const response = await axios.get<IMapList[]>(
          `/backend/python/api/map/GetClimbPlace?northEast=${northEast.lng()},${northEast.lat()}&southWest=${southWest.lng()},${southWest.lat()}`,
          {
            withCredentials: true,
          }
        )
        setLoading(false)
        return response.data
      } catch (error) {
        setError(true)
        setLoading(false)
        return []
      }
    },
    []
  )

  // 현재 내 위치로 이동
  const moveToCurrentLocation = useCallback(() => {
    if (!mapInstanceRef.current || !location) return
    const newCenter = new naver.maps.LatLng(location.lat, location.lng)
    mapInstanceRef.current.setCenter(newCenter)
    mapInstanceRef.current.setZoom(15) // 필요시 줌 수준 설정
  }, [location])

  // 마커 클릭 이벤트
  const handleMarkerClick = useCallback(
    debounce((location: IMapList) => {
      new window.naver.maps.LatLng(location.lat, location.lng)
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

        // 장소에 마커 생성
        if (bounds.hasPoint(position)) {
          const marker = new window.naver.maps.Marker({
            position,
            map,
            title: markerData.name,
            icon: {
              content: `
                    <div style="display: flex; justify-content: center; align-items: center; width: 25px; height: 25px;">
                     <svg height="25" width="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#5bac73;} .st1{opacity:0.2;} .st2{fill:#231F20;} .st3{fill:#FFFFFF;} </style> <g id="Layer_1"> <g> <circle class="st0" cx="32" cy="32" r="32"></circle> </g> <g class="st1"> <g> <path class="st2" d="M32,14c-9.4,0-17,7.5-17,16.8C15,45.5,32,56,32,56s17-10.2,17-25.2C49,21.5,41.4,14,32,14z M32,38 c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S36.4,38,32,38z"></path> </g> </g> <g> <path class="st3" d="M32,12c-9.4,0-17,7.5-17,16.8C15,43.5,32,54,32,54s17-10.2,17-25.2C49,19.5,41.4,12,32,12z M32,36 c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S36.4,36,32,36z"></path> </g> </g> <g id="Layer_2"> </g> </g></svg>
                    </div>`,
              size: new naver.maps.Size(22, 22),
              scaledSize: new naver.maps.Size(25, 34),
            },
          })

          const listener = naver.maps.Event.addListener(marker, 'click', () =>
            handleMarkerClick(markerData)
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

  // 지도 드래그로 위치 조정
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
    [getMapList, updateMarkers]
  )

  // 지도 확대 이벤트
  const zoomIn = () => {
    const currentZoom = mapInstanceRef.current?.getZoom() || 10
    mapInstanceRef.current?.setZoom(currentZoom + 1) // 줌 확대
  }

  // 지도 축소 이벤트
  const zoomOut = () => {
    const currentZoom = mapInstanceRef.current?.getZoom() || 10
    mapInstanceRef.current?.setZoom(currentZoom - 1) // 줌 축소
  }

  // 리스트에서 클릭 시 마커 이동
  const handleOnMoveLocation = useCallback(
    debounce(() => {
      if (lat && lng && mapInstanceRef.current) {
        const newCenter = new naver.maps.LatLng(lat, lng)
        mapInstanceRef.current.panTo(newCenter)
        // mapInstanceRef.current.setZoom(18)
      }
    }, 200),
    [lat, lng]
  )

  useEffect(() => {
    handleOnMoveLocation()
    return handleOnMoveLocation.cancel
  }, [handleOnMoveLocation])

  useEffect(() => {
    if (!mapRef.current || !location || !bound) return

    const { naver } = window

    mapInstanceRef.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(location.lat, location.lng),
      zoom: 15,
    })

    // 현재 위치 마커
    const currentPosition = new naver.maps.LatLng(location.lat, location.lng)
    new naver.maps.Marker({
      position: currentPosition,
      map: mapInstanceRef.current,
      icon: {
        content: `
        <div style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
          <svg width="30" height="30" fill="#0080ff" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="-39.57 -39.57 474.85 474.85" xml:space="preserve" stroke="#0080ff">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path> </g> </g></svg>
        </div>`,
      },
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
  }, [location, bound, handleMapUpdate])

  return {
    loading,
    error,
    mapRef,
    selectPlace,
    moveToCurrentLocation,
    zoomIn,
    zoomOut,
  }
}

export default useMap
