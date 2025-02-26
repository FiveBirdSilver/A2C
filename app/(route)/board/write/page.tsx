import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import BoardWriteClient from '@/components/clients/BoardWriteClient.tsx'
import { IMapList } from '@/hooks/common/useMap.tsx'
import Loading from '@/app/loading.tsx'
import { getCheckAuth } from '@/libs/apis/auth.ts'
import { cookies } from 'next/headers'

// 클라이밍 장소 선택을 위한 리스트 데이터
async function fetchList() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/python/api/map/GetClimbPlaceList?my_lat=0&my_lng=0`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  return res.json()
}
export default async function Page() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')

  // 미 로그인 유저 로그인 화면으로 리다이렉트
  const isLoggedIn = await getCheckAuth(sessionId)

  if (!isLoggedIn || isLoggedIn?.result === 'fail') {
    redirect('/login')
  }

  const lists: IMapList[] = await fetchList()

  return (
    <Suspense fallback={<Loading />}>
      <BoardWriteClient data={lists} />
    </Suspense>
  )
}
