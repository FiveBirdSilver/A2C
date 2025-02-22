'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function ScrollRestoration() {
  const pathname = usePathname()
  const sessionName = pathname.split('/')

  useEffect(() => {
    if (sessionName.length > 3) return

    const storedScrollY = sessionStorage.getItem(`scroll-${sessionName[1]}`)
    if (storedScrollY) {
      window.scrollTo(0, parseInt(storedScrollY, 10))
    }

    const handleScroll = () => {
      console.log(window.scrollY)
      sessionStorage.setItem(
        `scroll-${sessionName[1]}`,
        window.scrollY.toString()
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return null
}
