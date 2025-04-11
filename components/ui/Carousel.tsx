'use client'
import { Swiper } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper'

import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ReactNode } from 'react'
import { CSSProperties } from 'react'

interface ICarousel {
  children: ReactNode
  slidesPerView: number
  autoplay: number
  breakpoints?: {
    [key: number]: {
      slidesPerView: number
    }
  }
  style?: CSSProperties
  onSwiper?: (swiper: SwiperCore) => void // swiper 객체를 받아 처리할 함수 타입
}

const Carousel = ({
  children,
  slidesPerView,
  breakpoints,
  style,
  autoplay,
  onSwiper,
}: ICarousel) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={12}
      slidesPerView={slidesPerView}
      navigation
      autoplay={
        autoplay !== 0 ? { delay: autoplay, disableOnInteraction: true } : false
      }
      loop={true}
      speed={1500}
      scrollbar={{ draggable: true }}
      breakpoints={breakpoints}
      style={style}
      onSwiper={onSwiper}
    >
      {children}
    </Swiper>
  )
}

export default Carousel
