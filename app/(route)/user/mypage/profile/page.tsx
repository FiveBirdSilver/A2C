import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Loading from '@/app/loading.tsx'
import { redirect } from 'next/navigation'
import MyPageProfileClient from '@/components/clients/MyPageProfileClient.tsx'
import { getCheckAuth } from '@/libs/apis/auth.ts'

export default async function Page() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')
  const data = await getCheckAuth(sessionId)

  if (!data || data.result === 'fail') {
    redirect('/login')
  }

  return (
    <Suspense fallback={<Loading />}>
      <MyPageProfileClient data={data} />
    </Suspense>
  )
}
