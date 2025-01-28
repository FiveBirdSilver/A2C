import { Suspense } from 'react'
import BoardWriteClient from '@/components/clients/BoardWriteClient.tsx'
import { IMapList } from '@/hooks/common/useMap.tsx'
import Loading from '@/app/loading.tsx'

// 클라이밍 장소 선택을 위한 리스트 데이터
async function fetchList(sessionId?: { name: string; value: string }) {
  const url = `https://a2climbing.kro.kr/python/api/map/GetClimbPlaceList?my_lat=0&my_lng=0`
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
  const data: IMapList[] = await fetchList()

  return (
    <Suspense fallback={<Loading />}>
      <BoardWriteClient data={data} />
    </Suspense>
  )
}
