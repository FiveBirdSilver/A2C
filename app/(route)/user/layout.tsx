import { ReactNode } from 'react'

import GlobalHeader from '@/components/layouts/GlobalHeader.tsx'
import GlobalFooter from '@/components/layouts/GlobalFooter.tsx'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto h-full'>
      <GlobalHeader />
      <div className='h-full mx-auto my-0 py-20 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
      <GlobalFooter />
    </div>
  )
}
