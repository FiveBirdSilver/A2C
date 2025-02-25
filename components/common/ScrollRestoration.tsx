'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * 데이터 서버 렌더링 시 사용할 스크롤 위치 복원 컴포넌트
 * @constructor
 */

export default function ScrollRestoration() {
  const pathname = usePathname()
  const page = pathname.split('/')

  useEffect(() => {
    if (page.length > 3) return

    const storedScrollY = sessionStorage.getItem(`scroll-${page[1]}`)
    if (storedScrollY) {
      window.scrollTo(0, parseInt(storedScrollY, 10))
    }

    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${page[1]}`, window.scrollY.toString())
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
