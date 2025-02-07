'use client'
import { Swiper } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ReactNode } from 'react'
import { CSSProperties } from 'react'

interface ICarousel {
  children: ReactNode
  slidesPerView: number
  breakpoints: {
    [key: number]: {
      slidesPerView: number
    }
  }
  style?: CSSProperties
  onSwiper?: (swiper: any) => void // swiper 객체를 받아 처리할 함수 타입
}
const Carousel = ({
  children,
  slidesPerView,
  breakpoints,
  style,
  onSwiper,
}: ICarousel) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={12}
      slidesPerView={slidesPerView}
      navigation
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      speed={1500}
      scrollbar={{ draggable: true }}
      breakpoints={breakpoints}
      style={style}
      onSwiper={onSwiper}
      // onSlideChange={() => console.log('slide change')}
    >
      {children}
    </Swiper>
  )
}

export default Carousel
