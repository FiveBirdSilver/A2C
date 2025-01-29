import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Loading from '@/app/loading.tsx'
import BoardListClient from '@/components/clients/BoardListClient.tsx'

interface IBoard {
  data: {
    images: string[]
    location: {
      point: string
      lat: number
      lng: number
    }
    _id: string
    title: string
    type: string
    content: string
    contentType: string
    chatCount: number
    viewCount: number
    heartCount: number
    priceType: string
    price: string
    author: {
      nickname: string
    }
    createdAt: string
    updatedAt: string
    __v: string
  }[]
}

// 초기데이터만 SSR 이후부터 CSR => 초기 렌더링 속도 및 SEO를 위함
async function fetchBoard(sessionId?: { name: string; value: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board?page=1`
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
  const data: IBoard = await fetchBoard(sessionId)
  return (
    <Suspense fallback={<Loading />}>
      <BoardListClient initialData={data.data} />
    </Suspense>
  )
}
