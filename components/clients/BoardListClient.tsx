'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
// import { HiPencilSquare } from 'react-icons/hi2'
import { MdLocationPin } from 'react-icons/md'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import Tabs from '@/components/elements/Tabs.tsx'
import Carousel from '@/components/elements/Carousel.tsx'
import climbingPartners from '@/constants/climbingPartners.json'
import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'
import { instance } from '@/libs/apis/instance.ts'
import Link from 'next/link'

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
  const isMobile = useMediaQuery('(max-width: 768px)')

  // 탭 메뉴 상태
  const [checkedMenu, setCheckedMenu] = useState<string>('전체')

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
      <div className='flex flex-col items-center md:items-start justify-center'>
        <Tabs
          items={['전체', '구해요', '같이해요']}
          value={checkedMenu}
          setState={setCheckedMenu}
        />
      </div>
      <div className='grid gap-4 md:grid-cols-3 grid-cols-1'>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex flex-col w-full'>
            {allBoards?.map((board: IBoard) => (
              <div
                key={board._id}
                onClick={() =>
                  router.push(
                    `/board/detail/${board._id}?contentType=${board.contentType}`
                  )
                }
                className='cursor-pointer'
              >
                <div className='text-gray-900 p-4 rounded-lg w-full space-y-4 '>
                  <div className='flex justify-between'>
                    <div className='bg-green-500 text-xs px-2 py-1 rounded-full inline-block text-white font-bold'>
                      {board.priceType === 'find' ? '구해요' : '같이해요'}
                    </div>
                    <p className='text-gray-400 text-xs'>
                      {dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </p>
                  </div>
                  <h2 className='text-lg font-bold'>{board.title}</h2>
                  <p className='text-gray-400 text-sm'>{board.content}</p>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-400 text-xs'>
                      {board.author.nickname}
                    </span>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center gap-1 text-xs text-gray-400'>
                        <IoHeartOutline />
                        <span>{board.heartCount}</span>
                      </div>
                      <div className='flex items-center gap-1 text-xs text-gray-400'>
                        <IoChatbubbleOutline />
                        <span>{board.chatCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-end bg-gray-50 px-4 py-2 rounded-lg gap-1'>
                    {/*<span className='text-green-400 text-xs font-bold'>*/}
                    {/*  {board.location}*/}
                    {/*</span>*/}
                    <MdLocationPin className='text-green-400' />
                    <span className='text-green-400 text-xs font-bold'>
                      {board.location.point}
                    </span>
                  </div>
                </div>
                <div className='border-gray-100 border-[0.5px]' />
              </div>
            ))}
            <div ref={ref} className='p-0.5' />
          </div>
        </div>
        {!isMobile && (
          <div className='col-span-1'>
            <div className='sticky top-20'>
              <Link
                href={'/board/write'}
                className='hidden md:flex md:items-center gap-2 bg-gray-50 p-4 w-80 rounded-xl mb-4'
              >
                {/*<HiPencilSquare className={'text-gray-400 text-2xl'} />*/}
                <span className={'text-gray-400 text-sm'}>
                  클라이밍 궁금증을 나누고 새 파트너를 만나보세요
                </span>
              </Link>
              <div className='hidden md:block bg-gray-50 text-white p-4 w-80 rounded-xl mb-4'>
                <Carousel data={climbingPartners} />
              </div>
              <div className='hidden md:block bg-gray-50 text-white p-4 w-80 rounded-xl'>
                {/*<Calendars />*/}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => router.push('/board/write')}
          className='fixed md:hidden bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white z-10 md:bottom-20  bottom-24 right-4 cursor-pointer'
        >
          <HiOutlinePencilAlt />
        </button>
      </div>
    </>
  )
}
export default BoardListClient
