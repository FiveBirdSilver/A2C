'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { useInView } from 'react-intersection-observer'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { MdLocationPin } from 'react-icons/md'

import { useInfiniteQueries } from '@/hooks/queries/useInfiniteQueries.tsx'
import Skeleton from '@/components/elements/Skeleton.tsx'
import Tabs from '@/components/elements/Tabs.tsx'
import Carousel from '@/components/elements/Carousel.tsx'
import climbingPartners from '@/constants/climbingPartners.json'
import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'
import Error from '@/app/error.tsx'
import Loading from '@/app/loading.tsx'

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

const Page = () => {
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 768px)')

  // 탭 메뉴 상태
  const [checkedMenu, setCheckedMenu] = useState<string>('전체')

  // 게시글 무한 스크롤 마지막 시점
  const { ref, inView } = useInView({ threshold: 0 })

  // 게시글 무한 스크롤 조회
  const { isLoading, isError, isSuccess, data, fetchNextPage, hasNextPage } =
    useInfiniteQueries({
      queryKey: '/node/api/board',
    })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, fetchNextPage, hasNextPage])

  const renderBoard = useMemo(() => {
    if (isLoading) return <Loading />
    if (isError) return <Error message={'일시적인 오류가 발생했습니다'} />
    if (isSuccess)
      return (
        <>
          <div className='flex flex-col items-center md:items-start justify-center'>
            <Tabs
              items={['전체', '구해요', '같이해요']}
              value={checkedMenu}
              setState={setCheckedMenu}
            />
          </div>
          <div className='grid gap-4 md:grid-cols-3 grid-cols-1 pb-16'>
            <div className='col-span-1 md:col-span-2'>
              <div className='flex flex-col w-full'>
                {isLoading
                  ? Array.from({ length: 10 }, (_, index) => index).map((i) => (
                      <div key={i}>
                        <Skeleton />
                        <div className='border-gray-100 border-[0.5px]' />
                      </div>
                    ))
                  : isSuccess &&
                    data?.pages?.map((page: IBoard) => (
                      <div
                        key={page._id}
                        onClick={() =>
                          router.push(
                            `/board/detail/${page._id}?contentType=${page.contentType}`
                          )
                        }
                        className='cursor-pointer'
                      >
                        <div className='text-gray-900 p-4 rounded-lg w-full space-y-4 '>
                          <div className='flex justify-between'>
                            <div className='bg-green-500 text-xs px-2 py-1 rounded-full inline-block text-white font-bold'>
                              {page.priceType === 'find'
                                ? '구해요'
                                : '같이해요'}
                            </div>
                            <p className='text-gray-400 text-xs'>
                              {dayjs(page.createdAt).format(
                                'YYYY-MM-DD HH:mm:ss'
                              )}
                            </p>
                          </div>
                          <h2 className='text-lg font-bold'>{page.title}</h2>
                          <p className='text-gray-400 text-sm'>
                            {page.content}
                          </p>
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
                          <div className='flex items-center justify-end bg-gray-50 px-4 py-2 rounded-lg gap-1'>
                            {/*<span className='text-green-400 text-xs font-bold'>*/}
                            {/*  {page.location}*/}
                            {/*</span>*/}
                            <MdLocationPin className='text-green-400' />
                            <span className='text-green-400 text-xs font-bold'>
                              {page.location.point}
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
              className='fixed bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white z-10 md:bottom-20  bottom-24 right-4 cursor-pointer'
            >
              <HiOutlinePencilAlt />
            </button>
          </div>
        </>
      )
  }, [isLoading, isError, isSuccess, data, fetchNextPage, hasNextPage])

  return <>{renderBoard}</>
}
export default Page
