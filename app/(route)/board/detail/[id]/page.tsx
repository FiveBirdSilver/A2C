import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { HiPaperAirplane } from 'react-icons/hi'
import dayjs from 'dayjs'

import Loading from '@/app/loading.tsx'
import BoardMap from '@/components/common/BoardMap.tsx'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ contentType: string }>
}

interface IBoardDetail {
  result: string
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
    __v: string
  }
}

async function fetchBoardDetail(
  id: string,
  contentType: string,
  sessionId?: {
    name: string
    value: string
  }
) {
  const url = `https://a2climbing.kro.kr/node/api/board/${id}?contentType=${contentType}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${sessionId?.name}=${sessionId?.value}`,
    },
    credentials: 'include',
  })
  return res.json()
}

export default async function Page({ params, searchParams }: Props) {
  const id = (await params).id

  const contentType = (await searchParams).contentType
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')

  const data: IBoardDetail = await fetchBoardDetail(id, contentType, sessionId)
  if (data.result === 'fail') {
    redirect('/login')
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className='grid w-full'>
        <div className='border-b border-gray-200'>
          <div className='px-4 py-2'>
            <h1 className='text-2xl text-gray-800 font-bold'>
              {data?.data?.title}
            </h1>
            <div className='flex items-center justify-between gap-2 mt-4 text-sm text-gray-400'>
              <p className='font-medium text-xs'>구해요</p>
              <div className='flex items-center gap-2 text-xs'>
                <span>{data?.data?.author.nickname}</span>
                <span>|</span>
                <span>{dayjs(data?.data?.createdAt).format('YYYY-MM-DD')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 p-4 w-full mb-14 md:flex-row'>
          <div className='flex-[1.5]'>
            <div className='min-h-40 md:min-h-[22rem]'>
              <span className='text-sm'>{data?.data?.content}</span>
              <div></div>
            </div>
            <button
              className='
          flex items-center px-4 py-2 text-sm text-white font-bold bg-green-500
          rounded-none hover:bg-green-600 w-full justify-center h-14
          md:relative md:mt-4 md:rounded-lg md:h-auto
          fixed bottom-[-1px] left-0 z-[1000]
        '
            >
              <HiPaperAirplane className='text-xl rotate-45 mr-2 mb-1' />
              대화 시작하기
            </button>
          </div>

          <div className='flex-1 flex flex-col gap-3 min-h-60 md:min-h-96'>
            <span className='text-xs'>위치</span>
            <BoardMap
              name={data.data.location.point || ''}
              lat={data.data.location.lat || 0}
              lng={data.data.location.lng || 0}
            />
          </div>
        </div>
      </div>
    </Suspense>
  )
}
