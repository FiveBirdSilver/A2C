import { ReactNode } from 'react'
import GlobalHeader from '@/components/layouts/GlobalHeader.tsx'

export default async function MapLayout({ children }: { children: ReactNode }) {
  return (
    <div className='sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto h-full'>
      <GlobalHeader />
      <div className='h-full pt-14 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
    </div>
  )
}
