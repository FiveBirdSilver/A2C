'use client'
import { Swiper } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ReactNode } from 'react'

const Carousel = ({ children }: { children: ReactNode }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={100}
      // slidesPerView={4}
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      speed={1500}
      scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {children}
    </Swiper>
  )
}

export default Carousel
