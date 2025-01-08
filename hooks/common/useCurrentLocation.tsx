import { useEffect, useState } from 'react'

const useCurrentLocation = () => {
  // 현재 내 위치
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  )
  // 현재 내 위치의 북쫑, 남서
  const [bound, setBound] = useState<{
    northEast: { lat: number; lng: number }
    southWest: { lat: number; lng: number }
  } | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })

        // 기준 좌표 설정
        const lat = latitude
        const lng = longitude

        // 북동쪽 좌표(northEast)
        const northEast = {
          lat: parseFloat((lat + 0.01).toFixed(7)),
          lng: parseFloat((lng + 0.01).toFixed(7)),
        }

        // 남서쪽 좌표(southWest)
        const southWest = {
          lat: parseFloat((lat - 0.01).toFixed(7)),
          lng: parseFloat((lng - 0.01).toFixed(7)),
        }

        setBound({ northEast, southWest })
      })
    }
  }, [])

  return { location, bound }
}

export default useCurrentLocation
