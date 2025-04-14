import { ReactNode } from 'react'
import GlobalHeader from '@/components/layouts/GlobalHeader.tsx'
import ScrollRestoration from '@/components/common/ScrollRestoration.tsx'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto h-full'>
      <GlobalHeader />

      {/*스크롤 위치 복원 컴포넌트*/}
      <ScrollRestoration />
      <div className='h-full pt-14 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
    </div>
  )
}
