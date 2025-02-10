'use client'

import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { MdLocationPin } from 'react-icons/md'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'

import { instance } from '@/libs/apis/instance.ts'
import timeAgo from '@/libs/utils/timeAgo.ts'

interface IBoard {
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
}

const BoardListClient = ({ initialData }: { initialData: IBoard[] }) => {
  const router = useRouter()

  // 게시글 무한 스크롤 마지막 시점
  const { ref, inView } = useInView({ threshold: 0 })

  // 게시글 무한 스크롤 조회
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['getBoard'],
    queryFn: async ({ pageParam = 32 }) => {
      const response = await instance.get(`/node/api/board?page=${pageParam}`)
      return response.data.data
    },
    initialPageParam: 2,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1
    },
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, fetchNextPage, hasNextPage])

  const allBoards = data ? data.pages.flat() : []

  return (
    <>
      {allBoards?.map((board: IBoard) => (
        <div
          key={board._id}
          onClick={() =>
            router.push(
              `/board/detail/${board._id}?contentType=${board.contentType}`
            )
          }
          className='border border-gray-50 bg-white md:rounded-xl shadow-gray-50 md:shadow cursor-pointer h-full'
        >
          <div className='text-gray-900 p-2 md:p-4 rounded-lg w-full space-y-4 '>
            <h4 className='px-2'>{board.title}</h4>
            <p className='text-gray-400 text-sm px-2 pb-3'>{board.content}</p>
            <div className='flex items-center text-xs justify-between px-2'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-1 text-xs text-gray-400'>
                  <IoHeartOutline />
                  <span>{board.heartCount}</span>
                </div>
                <div className='flex items-center gap-1 text-xs text-gray-400'>
                  <IoChatbubbleOutline />
                  <span>{board.viewCount}</span>
                </div>
              </div>
              <span className='text-gray-400 text-xs'>
                {timeAgo(dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss'))}
              </span>
            </div>
            <div className='flex items-center justify-between md:bg-gray-50 px-2 md:px-4 py-2 rounded-lg gap-1'>
              <span className='text-gray-400 text-xs'>
                {board.author.nickname}
              </span>
              <div className={'flex items-center gap-1'}>
                <MdLocationPin className='text-green-400' />
                <span className='text-green-400 text-xs font-semibold'>
                  {board.location.point}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={ref} className='p-0.5' />
    </>
  )
}
export default BoardListClient
