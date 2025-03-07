import { ReactNode } from 'react'
import { cookies } from 'next/headers'

import GlobalHeader from '@/components/layouts/GlobalHeader.tsx'
import { getCheckAuth } from '@/libs/apis/auth.ts'

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')
  const data = await getCheckAuth(sessionId)

  return (
    <div className='sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto h-full'>
      <GlobalHeader data={data} />
      <div className='h-full mx-auto my-0 py-20 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl '>
        {children}
      </div>
    </div>
  )
}
