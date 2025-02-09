import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Loading from '@/app/loading.tsx'
import MyPageProfileClient from '@/components/clients/MyPageProfileClient.tsx'

async function fetchMyPage(sessionId?: { name: string; value: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/account`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${sessionId?.name}=${sessionId?.value}`,
    },
    credentials: 'include',
  })

  return res.json()
}

export default async function Page() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')
  const data = await fetchMyPage(sessionId)
  if (data.result === 'fail') {
    redirect('/login')
  }

  return (
    <Suspense fallback={<Loading />}>
      <MyPageProfileClient data={data} />
    </Suspense>
  )
}
