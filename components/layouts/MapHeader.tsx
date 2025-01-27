'use client'

import { BsChevronLeft } from 'react-icons/bs'
import Input from '@/components/elements/Input.tsx'
import { IoIosSearch } from 'react-icons/io'
import { useRouter } from 'next/navigation'

export default function MapHeader() {
  const router = useRouter()
  return (
    <div className='flex fixed top-0 w-full border-b border-gray-100 left-0 z-10 '>
      <div className='flex items-center bg-white mx-auto justify-between px-4 my-0 h-14 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
        <div className={'flex items-center justify-between w-full gap-6'}>
          <BsChevronLeft
            className={'text-gray-700 font-bold text-2xl cursor-pointer'}
            onClick={() => router.back()}
          />

          <div className={'flex items-center w-full'}>
            <Input id={'searchPlace'} label={''} direction={'row'} />
            <IoIosSearch
              className={'text-gray-700 font-bold text-3xl cursor-pointer'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
