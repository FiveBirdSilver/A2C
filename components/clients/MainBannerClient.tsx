'use client'

import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import Carousel from '@/components/elements/Carousel.tsx'
import bannerData from '@/constants/mainBanner.json'

interface IBanner {
  id: number
  img: string
  title: string
  subTitle: string
  bgColor: string
}

const MainBannerClient = () => {
  return (
    <Carousel>
      {bannerData.map((item: IBanner, index: number) => (
        <SwiperSlide key={item.id}>
          <div
            className={`flex justify-center md:justify-evenly w-full p-4 md:gap-20 md:rounded-xl md:mt-4`}
            style={{ backgroundColor: item.bgColor }}
            key={item.id}
          >
            {/*텍스트 부분*/}
            <div className='flex flex-col z-10 gap-4 justify-between w-full md:w-1/2 py-4 md:py-6'>
              <div className='flex flex-col gap-1 md:gap-4'>
                <h3 className='text-sm md:text-[1.375rem] font-semibold'>
                  {item.title}
                </h3>
                <p className=' text-xs md:text-sm whitespace-pre-wrap'>
                  {item.subTitle}
                </p>
              </div>
              <div className='flex'>
                <p className='text-gray-900 bg-white bg-opacity-30 text-xs rounded-3xl px-3 md:py-1 flex-shrink-0'>
                  {`${index + 1} / ${bannerData.length}`}
                </p>
              </div>
            </div>
            {/*이미지 부분*/}
            <div className='absolute right-0 top-0 opacity-50 md:relative md:opacity-100 w-40 md:w-52 h-48'>
              <Image
                src={`/banner/${item.img}`}
                alt={'banner'}
                sizes='100%'
                fill={true}
                style={{ objectFit: 'cover' }}
                className='rounded-xl'
                priority
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Carousel>
  )
}

export default MainBannerClient
