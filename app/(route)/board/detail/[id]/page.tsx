import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'

import Loading from '@/app/loading.tsx'
import BoardDetailMapClient from '@/components/clients/BoardDetailMapClient.tsx'
import Input from '@/components/elements/Input.tsx'
import BoardDetailSocialActions from '@/components/clients/BoardDetailSocialActions.tsx'

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
    comments: string[]
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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board/${id}?contentType=${contentType}`
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
      <div className='grid grid-cols-1 gap-8 py-4 md:px-20 md:grid-cols-6'>
        <div className='col-span-1 md:col-span-5'>
          {/*작성자 및 작성시각*/}
          <div className='border-b border-gray-200 px-4 py-2'>
            <h1 className='text-2xl text-gray-800'>{data?.data?.title}</h1>
            <div className='flex items-center justify-between gap-2 mt-4 text-sm text-gray-400'>
              <p className='font-medium text-xs'>구해요</p>
              <div className='flex items-center gap-2 text-xs'>
                <span>{data?.data?.author.nickname}</span>
                <span>|</span>
                <span>{dayjs(data?.data?.createdAt).format('YYYY-MM-DD')}</span>
              </div>
            </div>
          </div>

          {/*내용 및 이미지*/}
          <div className='flex flex-col gap-4 p-4 w-full'>
            <div className='min-h-40'>
              <span className='text-sm'>{data?.data?.content}</span>
            </div>

            {/*위치 (지도) */}
            <div className='flex flex-col gap-3'>
              <span className='text-xs'>위치</span>
              <div className='w-full h-60 md:h-48'>
                <BoardDetailMapClient
                  name={data.data.location.point || ''}
                  lat={data.data.location.lat || 0}
                  lng={data.data.location.lng || 0}
                />
              </div>
            </div>

            {/*조회수 및 좋아요수 */}
            <dl className='flex justify-end border-b border-gray-200 px-4 py-2 gap-2 mt-4 text-xs text-gray-400'>
              <dt>조회 {data?.data?.viewCount.toLocaleString()}</dt>
              <span>·</span>
              <dt>좋아요 {data?.data?.heartCount.toLocaleString()}</dt>
            </dl>
          </div>

          {/*댓글*/}
          <div className='w-full px-4 space-y-4'>
            <div className={'flex space-x-2 items-center text-base pl-2'}>
              <span className={'text-gray-700'}>댓글</span>
              <span className={'text-green-400 md:font-semibold'}>
                {data.data?.comments.length || 0}
              </span>
            </div>
            <Input
              id={'comments'}
              label={''}
              direction={'row'}
              placeholder={'댓글을 입력해주세요.'}
            />
          </div>
        </div>
        <BoardDetailSocialActions
          heartCount={data.data.heartCount}
          chatCount={data.data.chatCount}
        />
      </div>
    </Suspense>
  )
}
