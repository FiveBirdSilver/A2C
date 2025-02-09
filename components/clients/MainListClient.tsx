'use client'

import Image from 'next/image'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { Swiper as SwiperCore } from 'swiper'
import { SwiperSlide } from 'swiper/react'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Carousel from '@/components/elements/Carousel.tsx'
import Skeleton from '@/components/elements/Skeleton.tsx'
import Link from 'next/link'

interface IBoard {
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

const MainListClient = (data: { data: IBoard[] }) => {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [mount, setMount] = useState<boolean>(false)
  const emptyArray = Array(4).fill(undefined)

  // 브라우저 뷰포트 크기 알 수 없어 카드 1개만 나오는 오류
  useEffect(() => {
    setMount(true)
  }, [])

  return (
    <div className={'flex flex-col space-y-4 w-full'}>
      <div className={'flex items-center justify-between w-full px-2'}>
        <div className={'flex items-center space-x-2'}>
          <Image src={'/icons/fire.webp'} width={20} height={20} alt={'fire'} />
          <h2>이번주 A2C 인기글</h2>
        </div>
        <div className={'flex items-center gap-3'}>
          <button
            className={'border border-gray-200 rounded-full p-1'}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <IoIosArrowBack className={'text-lg text-gray-200'} />
          </button>
          <button
            className={'border border-gray-200 rounded-full p-1'}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <IoIosArrowForward className={'text-lg text-gray-200'} />
          </button>
        </div>
      </div>
      {mount ? (
        <div className='flex justify-center overflow-x-auto'>
          <Carousel
            breakpoints={{
              1024: { slidesPerView: 4 },
            }}
            slidesPerView={2}
            style={{ padding: 2 }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            autoplay={0}
          >
            {data.data?.map((board) => (
              <SwiperSlide key={board._id}>
                <div
                  key={board._id}
                  className='border border-gray-50 bg-white rounded-xl shadow cursor-pointer h-full'
                >
                  <Link
                    href={`/board/detail/${board._id}?contentType=${board.contentType}`}
                  >
                    <div className='text-gray-900 p-2 md:p-4 rounded-lg w-full space-y-1 md:space-y-4'>
                      <h4 className='px-2 min-h-6 overflow-hidden whitespace-nowrap overflow-ellipsis break-all'>
                        {board.title}
                      </h4>
                      <p className='text-gray-400 text-sm px-2 pb-3 min-h-12 overflow-hidden whitespace-nowrap overflow-ellipsis break-all'>
                        {board.content}
                      </p>
                      <div className='flex items-center text-xs justify-end md:justify-between px-2'>
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
                        <span className='hidden md:flex text-gray-400 text-xs'>
                          {dayjs(board.createdAt).format('YYYY-MM-DD')}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className='w-full overflow-x-hidden'>
          <div className='flex md:grid md:grid-cols-4 gap-4 p-2 md:min-h-44'>
            {emptyArray.map((_, index) => (
              <div
                key={index}
                className='w-44 md:w-full flex-shrink-0 border border-gray-50 bg-white rounded-xl shadow cursor-pointer h-full'
              >
                <Skeleton />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default MainListClient
