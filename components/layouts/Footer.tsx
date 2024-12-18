'use client'
import { useRouter } from 'next/navigation'
import { FiMapPin } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'
import { FaRegUser } from 'react-icons/fa'
import { FaRegComments } from 'react-icons/fa6'

export default function Footer() {
  const router = useRouter()

  return (
    <div className='fixed bottom-0 left-0 w-full border-t border-gray-100 bg-gray-50'>
      <div className='flex items-center justify-between pl-8 pr-10 mx-auto mt-2 text-lg text-gray-600 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg font-PretendardR'>
        <div
          className='flex flex-col items-center cursor-pointer'
          onClick={() => router.push('/board')}
        >
          <FaRegComments />
          <span className='text-[9px]'>COMMUNITY</span>
        </div>
        <div
          className='flex flex-col items-center cursor-pointer'
          onClick={() => router.push('/view')}
        >
          <FiMapPin />
          <span className='text-[9px]'>FACILITIES</span>
        </div>
        <div
          className='flex flex-col items-center cursor-pointer'
          onClick={() => router.push('/')}
        >
          <GrHomeRounded />
          <span className='text-[9px]'>HOME</span>
        </div>
        <div
          className='flex flex-col items-center cursor-pointer'
          onClick={() => router.push('/login')}
        >
          <FaRegUser />
          <span className='text-[9px]'>MY</span>
        </div>
      </div>
    </div>
  )
}
