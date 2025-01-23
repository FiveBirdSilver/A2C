/// <reference types="navermaps" />

import { useEffect, useRef, useCallback, useState } from 'react'
import debounce from 'lodash/debounce'

import useCurrentLocation from '@/hooks/common/useCurrentLocation.tsx'
import { instance } from '@/libs/apis/instance.ts'

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

const useAllMap = ({ lat, lng }: IMapProps) => {
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
        const response = await instance.get<IMapList[]>(
          `/python/api/map/GetClimbPlace?northEast=${northEast.lng()},${northEast.lat()}&southWest=${southWest.lng()},${southWest.lat()}`,
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
                    <div style="display: flex; justify-content: center; align-items: center; width: 22px; height: 22px;">
                      <svg width="22" height="22" viewBox="0 0 50 50" fill="#fff" xmlns="http://www.w3.org/2000/svg" overflow="inherit" stroke="#fff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0">
                          <rect x="-5" y="-5" width="60.00" height="60.00" rx="30" fill="#5bac73"></rect>
                        </g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M17.962 44.874c.374.403.352 1.041-.05 1.416l-2.172 2.031c-.402.375-1.037.353-1.411-.051l-12.649-13.632c-.374-.403-.351-1.04.051-1.416l2.175-2.028c.402-.376 1.037-.353 1.411.051l12.645 13.629zm16.14-25.65c.374.403.351 1.041-.051 1.416l-13.67 12.77c-.402.375-1.037.353-1.411-.051l-3.263-3.521c-.374-.403-.351-1.041.051-1.416l13.667-12.77c.401-.375 1.036-.353 1.41.051l3.267 3.521zm-11.489 21.303c.374.403.351 1.04-.051 1.416l-2.175 2.03c-.402.376-1.037.353-1.411-.051l-12.642-13.632c-.374-.403-.352-1.041.05-1.416l2.171-2.029c.402-.375 1.037-.353 1.411.051l12.647 13.631zm21.063-20.814c.374.403.351 1.041-.052 1.416l-2.174 2.03c-.402.375-1.037.353-1.412-.05l-12.644-13.629c-.375-.403-.352-1.04.05-1.416l2.18-2.035c.401-.375 1.036-.353 1.41.051l12.642 13.633zm4.644-4.34c.374.403.351 1.041-.051 1.417l-2.17 2.029c-.401.376-1.036.353-1.41-.05l-12.642-13.635c-.374-.403-.352-1.041.05-1.417l2.172-2.033c.401-.376 1.035-.354 1.409.05l12.642 13.639z"></path>
                        </g>
                      </svg>
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
        // mapInstanceRef.current.setZoom(15)
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

export default useAllMap
