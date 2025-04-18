'use client'
import { Swiper } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { ReactNode } from 'react'
import { CSSProperties } from 'react'

/**
 * Carousel 컴포넌트
 *
 * @param children - 슬라이드에 들어갈 요소들
 * @param slidesPerView - 기본 보여줄 슬라이드 개수
 * @param autoplay - 자동 재생 시간(ms), 0이면 자동 재생 비활성화
 * @param breakpoints - 반응형 설정을 위한 슬라이드 개수 정의
 * @param style - Swiper 전체에 적용할 인라인 스타일
 * @param onSwiper - Swiper 인스턴스를 사용자가 접근할 수 있게 전달
 */

interface CarouselProps {
  children: ReactNode
  slidesPerView: number
  autoplay: number
  breakpoints?: {
    [key: number]: {
      slidesPerView: number
    }
  }
  style?: CSSProperties
  onSwiper?: (swiper: SwiperCore) => void
}

const Carousel = ({
  children,
  slidesPerView,
  breakpoints,
  style,
  autoplay,
  onSwiper,
}: CarouselProps) => {
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
