'use client'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import { MdLocationPin } from 'react-icons/md'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import Tabs from '@/components/elements/Tabs.tsx'
import Carousel from '@/components/elements/Carousel.tsx'
import climbingPartners from '@/constants/climbingPartners.json'
import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'
import { instance } from '@/libs/apis/instance.ts'
import Image from 'next/image'

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
      <div className='flex flex-col items-start justify-center'>
        <Tabs
          items={['전체', '구해요', '같이해요', '궁금해요']}
          value={checkedMenu}
          setState={setCheckedMenu}
        />
      </div>
      <div className='grid gap-8 md:grid-cols-3 grid-cols-1'>
        <div className='col-span-1 md:col-span-2'>
          <div className='flex flex-col w-full gap-5 bg-[#f8f9fa] md:bg-white'>
            {allBoards?.map((board: IBoard) => (
              <div
                key={board._id}
                onClick={() =>
                  router.push(
                    `/board/detail/${board._id}?contentType=${board.contentType}`
                  )
                }
                className='border border-gray-50 bg-white md:rounded-xl shadow-gray-50 md:shadow cursor-pointer'
              >
                <div className='text-gray-900 p-2 md:p-4 rounded-lg w-full space-y-4 '>
                  <h4 className='px-2'>{board.title}</h4>
                  <p className='text-gray-400 text-sm px-2 pb-3'>
                    {board.content}
                  </p>
                  <div className='flex items-center text-xs justify-between px-2'>
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
                    <span className='text-gray-400 text-xs'>
                      {dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
                  </div>
                  <div className='flex items-center justify-between md:bg-gray-50 px-2 md:px-4 py-2 rounded-lg gap-1'>
                    <span className='text-gray-400 text-xs'>
                      {board.author.nickname}
                    </span>
                    <div className={'flex items-center'}>
                      <MdLocationPin className='text-green-400' />
                      <span className='text-green-400 text-xs font-bold'>
                        {board.location.point}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={ref} className='p-0.5' />
          </div>
        </div>
        {!isMobile && (
          <div className='col-span-1'>
            <div className='sticky top-20'>
              <div className={'flex flex-col gap-2'}>
                <div className='flex items-center gap-2'>
                  <Image src={'/pin.png'} width={20} height={20} alt={'pin'} />
                  <span className={'text-gray-700 text-sm'}>
                    바로 내 근처에 있어요
                  </span>
                </div>
                <div className='hidden md:block bg-gray-50 text-white p-4 w-80 rounded-xl mb-8'>
                  <Carousel data={climbingPartners} />
                </div>
              </div>
              {/*<div className='hidden md:block bg-gray-50 text-white p-4 w-80 rounded-xl'>*/}
              {/*  <Calendars />*/}
              {/*</div>*/}
              <div className={'flex flex-col gap-2'}>
                <div className='flex items-center gap-2'>
                  {/*<HiSparkles className={'text-green-400 text-xl'} />*/}
                  <Image
                    src={'/highfive.png'}
                    width={20}
                    height={20}
                    alt={'highfive'}
                  />
                  <span className={'text-gray-700 text-sm'}>
                    클라이밍 궁금증을 나누고 새 파트너를 만나보세요
                  </span>
                </div>
                <Link href={'/board/write'}>
                  <button className='flex items-center py-4 text-sm font-semibold text-green-500 bg-green-100 rounded-xl hover:bg-green-200 w-full justify-center '>
                    글 작성
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        <Link
          className='fixed md:hidden bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white z-10 bottom-12 right-4 cursor-pointer'
          href={'/board/write'}
        >
          <HiOutlinePencilAlt />
        </Link>
      </div>
    </>
  )
}
export default BoardListClient
