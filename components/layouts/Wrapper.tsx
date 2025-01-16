'use client'
import { ReactNode } from 'react'

import Header from '@/components/layouts/Header.tsx'
import Footer from '@/components/layouts/Footer.tsx'
import useMediaQuery from '@/hooks/common/useMediaQuery'

export default function Wrapper({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className='sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto h-full'>
      {!isMobile && <Header />}
      <div className='h-full md:pt-14 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
      {isMobile && <Footer />}
    </div>
  )
}
