'use client'

import Image from 'next/image'
import dayjs from 'dayjs'
import { useRef } from 'react'
import { Swiper as SwiperCore } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

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

const MainListClient = (data: { data: IBoard[] }) => {
  const swiperRef = useRef<SwiperCore | null>(null)

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
      <div className={'flex  justify-center'}>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          // autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          speed={1500}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data.data?.map((board) => (
            <SwiperSlide key={board._id}>
              <div
                key={board._id}
                className='my-1 border border-gray-50 bg-white rounded-xl shadow cursor-pointer h-full'
              >
                <div className='text-gray-900 p-2 md:p-4 rounded-lg w-full space-y-4 '>
                  <h4 className='px-2 min-h-12'>{board.title}</h4>
                  <p className='text-gray-400 text-sm px-2 pb-3 min-h-20'>
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
                      {dayjs(board.createdAt).format('YYYY-MM-DD')}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default MainListClient
