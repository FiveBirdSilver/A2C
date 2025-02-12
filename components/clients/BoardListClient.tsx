'use client'

import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { MdLocationPin } from 'react-icons/md'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { AiOutlineEye } from 'react-icons/ai'
import timeAgo from '@/libs/utils/timeAgo.ts'
import axios from 'axios'

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
      const response = await axios.get(
        `/backend/node/api/board?page=${pageParam}`,
        {
          withCredentials: true,
        }
      )
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
          <div className='text-gray-900 rounded-lg w-full md:p-4 md:space-y-4'>
            <div className='p-4 md:px-2 md:p-0 space-y-3'>
              <h4>{board.title}</h4>
              <p className='text-gray-400 text-sm pb-3'>{board.content}</p>
              <div className='flex items-center text-xs justify-between'>
                <div className='flex items-center text-xs text-gray-400 space-x-1'>
                  <span className='text-gray-400 text-xs'>
                    {board.author.nickname}
                  </span>
                  <span>·</span>
                  <span className='text-gray-400 text-xs'>
                    {timeAgo(
                      dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')
                    )}
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='flex items-center space-x-1 text-xs text-gray-400'>
                    <AiOutlineEye />
                    <span>{board.viewCount}</span>
                  </div>
                  <div className='flex items-center space-x-1 text-xs text-gray-400'>
                    <IoHeartOutline />
                    <span>{board.heartCount}</span>
                  </div>
                  <div className='flex items-center space-x-1 text-xs text-gray-400'>
                    <IoChatbubbleOutline />
                    <span>{board.chatCount}</span>
                  </div>
                </div>
              </div>
            </div>
            {board.contentType === 'deal' && (
              <div className='flex items-center justify-between rounded-none px-4 py-3 md:bg-gray-50 border-t border-gray-100 md:border-none md:rounded-lg'>
                <span className='text-gray-400 text-xs'>
                  {board.priceType === 'find' ? '구해요' : '같이해요'}
                </span>
                <div className={'flex items-center gap-1'}>
                  <MdLocationPin className='text-green-400' />
                  <span className='text-green-400 text-xs'>
                    {board.location?.point ?? '위치 정보 없음'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={ref} className='p-0.5' />
    </>
  )
}
export default BoardListClient
