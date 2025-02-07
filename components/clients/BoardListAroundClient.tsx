'use client'

import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import Carousel from '@/components/elements/Carousel.tsx'
import climbingPartners from '@/constants/climbingPartners.json'

const BoardListAroundClient = () => {
  return (
    <div className='hidden md:block bg-gray-50 text-white p-4 w-80 rounded-xl mb-8'>
      <Carousel slidesPerView={1} autoplay={5000}>
        {climbingPartners?.map((v) => (
          <SwiperSlide key={v.id}>
            <div className='flex items-center gap-4'>
              <Image
                src={v.profile}
                alt='profile'
                className='rounded object-cover'
                priority
                width={50}
                height={50}
              />
              <div className='flex flex-col gap-2'>
                <h2 className='text-sm text-gray-900 font-semibold'>
                  {v.name}
                </h2>
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
      </Carousel>
    </div>
  )
}

export default BoardListAroundClient
