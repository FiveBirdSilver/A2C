import { Suspense } from 'react'
import { cookies } from 'next/headers'

import Loading from '@/app/loading.tsx'
import BoardDetailClient from '@/components/clients/BoardDetailClient.tsx'
import BoardDetailSocialClient from '@/components/clients/BoardDetailSocialClient.tsx'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ contentType: string }>
}

interface IBoardDetail {
  result: string
  isLiked: boolean
  data: {
    images: string[]
    location: {
      point: string
      coordinates: number[]
    }
    _id: string
    title: string
    type: string
    content: string
    contentType: string
    chatCount: number
    viewCount: number
    heartCount: number
    price: string
    author: {
      nickname: string
    }
    createdAt: string
    updatedAt: string
    comments: {
      _id: string
      content: string
      board: string
      parentCommentId: string
      createdAt: string
      updatedAt: string
      __v: string
    }[]
  }
}

async function fetchBoardDetail(
  id: string,
  contentType: string,
  sessionId?: {
    name: string
    value: string
  },
  viewBoardId?: {
    name: string
    value: string
  }
) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board/${id}?contentType=${contentType}`

  // 쿠키 값 조합
  const cookies = [
    `${sessionId?.name}=${sessionId?.value}`,
    `${viewBoardId?.name}=${viewBoardId?.value}`,
  ]
    .filter(Boolean)
    .join('; ')

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies,
    },
    credentials: 'include',
  })

  const data = await res.json()
  const cookie = res.headers.get('Set-Cookie')

  return { data, cookie }
}

export default async function Page({ params, searchParams }: Props) {
  const id = (await params).id

  const contentType = (await searchParams).contentType
  const cookieStore = await cookies()

  const sessionId = cookieStore.get('connect.sid')
  const viewBoardId = cookieStore.get('v_boards')
  const { data, cookie }: { data: IBoardDetail; cookie: string | null } =
    await fetchBoardDetail(id, contentType, sessionId, viewBoardId)

  return (
    <Suspense fallback={<Loading />}>
      <div className='grid grid-cols-1 gap-8 py-4 md:px-20 md:grid-cols-6'>
        <BoardDetailClient
          cookie={cookie}
          location={data.data.location}
          title={data.data.title}
          contentType={data.data.contentType}
          content={data.data.content}
          nickname={data.data.author.nickname}
          createdAt={data.data.createdAt}
          heartCount={data.data.heartCount}
          images={data.data.images}
          viewCount={data.data.viewCount}
          comments={data.data.comments}
        />
        <BoardDetailSocialClient
          isLiked={data.isLiked}
          heartCount={data.data.heartCount}
          chatCount={data.data.comments?.length ?? 0}
        />
      </div>
    </Suspense>
  )
}
