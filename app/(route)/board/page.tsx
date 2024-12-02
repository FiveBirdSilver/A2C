'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Separator } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { useInView } from 'react-intersection-observer'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { HiPaperAirplane } from 'react-icons/hi'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import Segmented from '@/components/elements/Segmented.tsx'
import { useInfiniteQueries } from '@/hooks/queries/useInfiniteQueries.tsx'
import { Skeleton } from '@/components/elements/Skeleton.tsx'

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
  const [checkedOption, setCheckedOption] = useState<string>('전체')
  const { ref, inView } = useInView({ threshold: 0 })
  const { isLoading, isSuccess, data, fetchNextPage, hasNextPage } =
    useInfiniteQueries({
      queryKey: 'board',
    })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, fetchNextPage, hasNextPage])

  {
    /*<div className='flex justify-center w-full h-full py-4'>*/
  }
  return (
    <div className='flex justify-center] w-full h-full py-4 sm:gap-0 md:gap-0 lg:gap-6 relative'>
      <div className='flex-[6] flex-col items-center w-full'>
        <div className='flex flex-col items-center justify-center'>
          <Segmented
            items={['전체', '구해요', '같이해요', '공유해요']}
            value={checkedOption}
            setState={setCheckedOption}
          />
        </div>
        <div className='flex flex-col w-full'>
          {isLoading
            ? Array.from({ length: 10 }, (_, index) => index).map((i) => (
                <Skeleton key={i} />
              ))
            : isSuccess &&
              data?.pages?.map((page: IBoard) => (
                <div key={page._id}>
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
                  <Separator className='border-gray-100 border-[0.5px]' />
                </div>
              ))}
          <div ref={ref} className='p-0.5' />
          <button
            onClick={() => router.push('/')}
            className='fixed bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white z-10 bottom-[4.5rem] right-4 cursor-pointer'
          >
            <HiOutlinePencilAlt />
          </button>
        </div>
      </div>
      <div className='relative sm:flex-none md:flex-none lg:flex-[4]'>
        <div className='fixed bg-gray-50 text-white p-4 w-72 rounded-xl'>
          <div className='flex items-center gap-4'>
            {/* 프로필 이미지 */}
            <Image
              src='https://postfiles.pstatic.net/MjAyNDA4MTFfMTE1/MDAxNzIzMzU2Mjc0MDAw.pffzKEUOeZCD-Z7YT5A560qiLhkbL-hEkCmhYrtWOhIg.GN28igOFZjLiNiDF6_9s5QCp6U98X9Ajkjn3Jh2Lb38g.JPEG/IMG_7910.JPG?type=w773' // 여기에 실제 이미지 경로를 삽입
              alt='프로필'
              className='rounded object-cover'
              priority
              width={60}
              height={60}
            />
            {/* 이름, 역할, 경력 */}
            <div className='flex flex-col gap-2'>
              <h2 className='text-[1rem] text-gray-900 font-semibold'>
                배부르다이말이야
              </h2>
              <div className='flex items-center space-x-2 text-sm text-gray-400'>
                <span className='text-green-400'>fivebirdsilver</span>
                <span>|</span>
                <span>seoul-강남</span>
              </div>
            </div>
          </div>
          {/* 상태 메시지 */}
          <p className='mt-4 mb-10 text-gray-400 text-sm '>
            안녕해? 안녕하냐고!
          </p>
          {/* 대화 시작하기 버튼 */}
          <button className='flex items-center px-4 py-2 text-sm text-white font-bold bg-green-500 rounded-lg hover:bg-green-600  w-full justify-center '>
            <HiPaperAirplane className='text-xl rotate-45 mr-2 mb-1' />
            대화 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
export default Page
