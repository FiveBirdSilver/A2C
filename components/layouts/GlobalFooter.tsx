'use client'
import Link from 'next/link'
import { FiMapPin } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'
import { FaRegUser } from 'react-icons/fa'
import { FaRegComments } from 'react-icons/fa6'
import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'

export default function GlobalFooter() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <>
      {isMobile && (
        <div className='fixed bottom-0 left-0 w-full border-t border-gray-100 bg-gray-50'>
          <div className='flex items-center justify-between px-4 mx-auto mt-2 text-lg text-gray-600 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
            <Link
              href='/board'
              className='flex flex-col items-center cursor-pointer'
            >
              <FaRegComments />
              <span className='text-[9px]'>운동생활</span>
            </Link>
            <Link
              href='/view/list'
              className='flex flex-col items-center cursor-pointer'
            >
              <FiMapPin />
              <span className='text-[9px]'>내주변</span>
            </Link>
            <Link
              href='/'
              className='flex flex-col items-center cursor-pointer'
            >
              <GrHomeRounded />
              <span className='text-[9px]'>홈</span>
            </Link>
            <Link
              href='/user/mypage'
              className='flex flex-col items-center cursor-pointer'
            >
              <FaRegUser />
              <span className='text-[9px]'>마이</span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
