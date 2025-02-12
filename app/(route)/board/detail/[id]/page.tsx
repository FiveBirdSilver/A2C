import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'

import Loading from '@/app/loading.tsx'
import BoardDetailClient from '@/components/clients/BoardDetailClient.tsx'
import BoardDetailSocialActions from '@/components/clients/BoardDetailSocialActions.tsx'

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
    price: string
    author: {
      nickname: string
    }
    createdAt: string
    updatedAt: string
    comments: string[]
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

  console.log(data)
  if (data.result === 'fail') {
    redirect('/login')
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='grid grid-cols-1 gap-8 py-4 md:px-20 md:grid-cols-6'>
        <BoardDetailClient
          cookie={cookie}
          point={data.data.location?.point || ''}
          lat={data.data.location?.lat || 0}
          lng={data.data.location?.lng || 0}
          title={data.data.title}
          content={data.data.content}
          nickname={data.data.author.nickname}
          createdAt={dayjs(data.data.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          heartCount={data.data.heartCount}
          viewCount={data.data.viewCount}
          comments={data.data.comments}
        />
        <BoardDetailSocialActions
          isLiked={data.isLiked}
          heartCount={data.data.heartCount}
          chatCount={data.data.chatCount}
        />
      </div>
    </Suspense>
  )
}
