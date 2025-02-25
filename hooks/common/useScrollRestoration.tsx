'use client'

import { RefObject, useEffect } from 'react'

/**
 * 특정 요소의 스크롤 위치를 복원하는 훅 - (클라이언트 컴포넌트에서 사용)
 * @param ref - 스크롤이 적용될 요소의 ref
 * @param key - sessionStorage에 저장될 키 값
 * @param isEnabled - 스크롤 복원 여부 (default: true)
 */
export function useElementScrollRestoration(
  ref: RefObject<HTMLElement>,
  key: string,
  isEnabled: boolean = true
) {
  useEffect(() => {
    if (!isEnabled) return

    const savedPosition = sessionStorage.getItem(key)
    if (savedPosition && ref.current) {
      ref.current.scrollTop = parseInt(savedPosition, 10)
    }
  }, [isEnabled])

  useEffect(() => {
    if (!ref.current) return

    const handleScroll = () => {
      sessionStorage.setItem(key, ref.current!.scrollTop.toString())
    }

    ref.current.addEventListener('scroll', handleScroll)
    return () => {
      ref.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
