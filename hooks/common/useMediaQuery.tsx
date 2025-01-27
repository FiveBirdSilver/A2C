import { useEffect, useState } from 'react'

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = () => setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

export default useMediaQuery
