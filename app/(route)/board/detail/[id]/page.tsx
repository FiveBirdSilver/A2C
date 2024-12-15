'use client'
import { useParams } from 'next/navigation'
import { HiPaperAirplane } from 'react-icons/hi'
import dayjs from 'dayjs'

import useBoardMap from '@/hooks/common/useBoardMap.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'

interface IBoardDetail {
  images: string[]
  _id: string
  title: string
  content: string
  location: string
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

const Page = () => {
  const { id } = useParams()
  const { mapRef } = useBoardMap({
    name: '골든플래닛',
    lat: 37.5058315272521,
    lng: 127.040806473603,
  })

  const getBoardDetail = useQueries<{ data: IBoardDetail; isLiked: boolean }>({
    queryKey: `getBoardDetail`,
    endpoint: `board/${id}`,
  })

  return (
    <div className='grid w-full'>
      <div className='border-b border-gray-200'>
        <div className='px-4 py-2'>
          <h1 className='text-2xl text-gray-800 font-bold'>
            {getBoardDetail.data?.data.title}
          </h1>
          <div className='flex items-center justify-between gap-2 mt-4 text-sm text-gray-400'>
            <p className='font-medium text-xs'>구해요</p>
            <div className='flex items-center gap-2 text-xs'>
              <span>{getBoardDetail.data?.data.author.nickname}</span>
              <span>|</span>
              <span>
                {dayjs(getBoardDetail.data?.data.createdAt).format(
                  'YYYY-MM-DD'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 p-4 w-full mb-14 md:flex-row'>
        <div className='flex-[1.5]'>
          <div className='min-h-40 md:min-h-[22rem]'>
            <span className='text-sm'>{getBoardDetail.data?.data.content}</span>
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
          <div ref={mapRef} className='w-full h-full rounded-lg border'></div>
        </div>
      </div>
    </div>
  )
}

export default Page
