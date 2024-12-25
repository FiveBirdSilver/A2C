'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { useInView } from 'react-intersection-observer'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import { useInfiniteQueries } from '@/hooks/queries/useInfiniteQueries.tsx'
import Skeleton from '@/components/elements/Skeleton.tsx'
import Tabs from '@/components/elements/Tabs.tsx'
import Carousel from '@/components/elements/Carousel.tsx'
import aroundPeopleData from '@/data/climbingPartners.json'

interface IBoard {
  _id: string
  title: string
  content: string
  location: string
  chatCount: number
  viewCount: number
  heartCount: number
  price: string | number
  author: {
    nickname: string
  }
  createdAt: string
  updatedAt: string
}

const Page = () => {
  const router = useRouter()

  // 탭 메뉴 상태
  const [checkedMenu, setCheckedMenu] = useState<string>('전체')

  // 게시글 무한 스크롤 마지막 시점
  const { ref, inView } = useInView({ threshold: 0 })

  // 게시글 무한 스크롤 조회
  const { isLoading, isSuccess, data, fetchNextPage, hasNextPage } =
    useInfiniteQueries({
      queryKey: 'board',
    })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <div className='flex justify-center w-full h-full py-4 sm:gap-0 md:gap-0 lg:gap-6 relative'>
      <div className='flex-[7] flex-col items-center w-full'>
        <div className='flex flex-col items-center justify-center'>
          <Tabs
            items={['전체', '구해요', '같이해요', '공유해요']}
            value={checkedMenu}
            setState={setCheckedMenu}
          />
        </div>
        <div className='flex flex-col w-full'>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => index).map((i) => (
                <Skeleton key={i} />
              ))
            : isSuccess &&
              data?.pages?.map((page: IBoard) => (
                <div
                  key={page._id}
                  onClick={() => router.push(`/board/detail/${page._id}`)}
                  className='cursor-pointer'
                >
                  <div className='text-gray-900 p-4 rounded-lg w-full space-y-4 '>
                    <div className='flex justify-between'>
                      <div className='bg-green-500 text-xs px-2 py-1 rounded-full inline-block text-white font-bold'>
                        구해요
                      </div>
                      <p className='text-gray-400 text-xs'>
                        {dayjs(page.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </p>
                    </div>
                    <h2 className='text-lg font-bold'>{page.title}</h2>
                    <p className='text-gray-400 text-sm'>{page.content}</p>
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-400 text-xs'>
                        {page.author.nickname}
                      </span>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1 text-xs text-gray-400'>
                          <IoHeartOutline />
                          <span>{page.heartCount}</span>
                        </div>
                        <div className='flex items-center gap-1 text-xs text-gray-400'>
                          <IoChatbubbleOutline />
                          <span>{page.chatCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg'>
                      <span className='text-green-400 text-xs font-bold'>
                        {page.location}
                      </span>
                      <span className='text-green-400 text-xs font-bold'>
                        {page.price}
                      </span>
                    </div>
                  </div>
                  <div className='border-gray-100 border-[0.5px]' />
                </div>
              ))}
          <div ref={ref} className='p-0.5' />
          <button
            onClick={() => router.push('/board/write')}
            className='fixex md:absolute bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white z-10 md:bottom-12 md:right-8 bottom-24 right-4 cursor-pointer'
          >
            <HiOutlinePencilAlt />
          </button>
        </div>
      </div>
      <div className='relative sm:flex-none md:flex-none lg:flex-[3]'>
        <div className='fixed bg-gray-50 text-white p-4 w-72 rounded-xl'>
          <Carousel data={aroundPeopleData} />
        </div>
      </div>
    </div>
  )
}
export default Page
