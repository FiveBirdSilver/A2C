'use client'
import { HiPaperAirplane } from 'react-icons/hi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

interface ICarousel {
  id: number
  name: string
  type: string
  location: string
  contents: string
  profile: string
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
              width={60}
              height={60}
            />
            <div className='flex flex-col gap-2'>
              <h2 className='text-[1rem] text-gray-900 font-semibold'>
                {v.name}
              </h2>
              <div className='flex items-center space-x-2 text-sm text-gray-400'>
                <span className='text-green-400'>{v.type}</span>
                <span>|</span>
                <span>{v.location}</span>
              </div>
            </div>
          </div>
          <p className='mt-4 mb-10 text-gray-400 text-sm '>{v.contents}</p>
          <button className='flex items-center px-4 py-2 text-sm text-white font-bold bg-green-500 rounded-lg hover:bg-green-600  w-full justify-center '>
            <HiPaperAirplane className='text-xl rotate-45 mr-2 mb-1' />
            대화 시작하기
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Carousel
