import { ReactNode } from 'react'
import Header from '@/components/layouts/Header.tsx'
import Footer from '@/components/layouts/Footer.tsx'

export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className='sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto h-full'>
      <Header />
      <div className='h-full px py-16 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
      <Footer />
    </div>
  )
}
