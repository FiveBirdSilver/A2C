import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { getCheckAuth } from '@/libs/apis/auth.ts'
import GlobalHeader from '@/components/layouts/GlobalHeader.tsx'
import ScrollRestoration from '@/components/common/ScrollRestoration.tsx'

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')
  const data = await getCheckAuth(sessionId)

  return (
    <div className='sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto h-full'>
      <GlobalHeader data={data} />

      {/*스크롤 위치 복원 컴포넌트*/}
      <ScrollRestoration />
      <div className='h-full pt-14 mx-auto my-0 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
    </div>
  )
}
