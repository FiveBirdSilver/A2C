'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'

interface ICarousel {
  id: number
  name: string
  type: string
  title: string
  location: string
  content: string
  profile: string
  chatCount: number
  heartCount: number
  createdAt: string
}

const Carousel = (props: { data: ICarousel[] }) => {
  const { data } = props
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={100}
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      speed={1500}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {data?.map((v) => (
        <SwiperSlide key={v.id}>
          <div className='flex items-center gap-4'>
            <Image
              src={v.profile}
              alt='프로필'
              className='rounded object-cover'
              priority
              width={50}
              height={50}
            />
            <div className='flex flex-col gap-2'>
              <h2 className='text-sm text-gray-900 font-semibold'>{v.name}</h2>
              <div className='flex items-center space-x-2 text-xs text-gray-400'>
                <span className='text-green-400'>{v.type}</span>
                <span>|</span>
                <span className={'text-gray-600'}>{v.location}</span>
              </div>
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-2'>
            <p className={'text-gray-600 text-sm'}>{v.title}</p>
            <p className={'text-gray-600 text-xs'}>{v.content}</p>
          </div>
          <div className='mt-8 flex justify-between items-center w-full'>
            <div className='flex items-center gap-2 text-xs text-gray-400'>
              <div className='flex items-center gap-1'>
                <IoHeartOutline />
                <span>{v.heartCount}</span>
              </div>
              <div className='flex items-center gap-1'>
                <IoChatbubbleOutline />
                <span>{v.chatCount}</span>
              </div>
            </div>
            <p className={'text-gray-400 text-xs'}>{v.createdAt}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
