'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LuMenu } from 'react-icons/lu'
import { IoIosSearch } from 'react-icons/io'
import { FaUserCircle } from 'react-icons/fa'
import Button from '@/components/elements/Button.tsx'

interface IAccount {
  result: {
    email: string
    nickname: string
  }
  message: string
}

export default function GlobalHeader(data: { data: IAccount }) {
  const router = useRouter()
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1]

  return (
    <div className='flex fixed top-0 w-full border-b border-gray-100 left-0 z-10 '>
      <div className='flex items-center bg-white mx-auto justify-between px-4 md:px-0 my-0 h-14 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
        <div className={'flex items-center gap-4'}>
          <Link href={'/'} className='flex items-center gap-1'>
            <Image
              src={'/logo_mobile.png'}
              width={45}
              height={20}
              alt='logo'
              priority
              className='md:hidden'
            />
            <Image
              src={'/logo.png'}
              width={100}
              height={55}
              alt='logo'
              priority
              className='hidden md:flex'
            />
          </Link>
          <div className='hidden text-gray-700 text-sm gap-3 md:flex'>
            <Link
              href='/board?type=all'
              className={`flex flex-col items-center cursor-pointer px-3 py-2 rounded-xl 
              ${currentPage === 'board' ? 'bg-green-50 text-green-500 hover:bg-green-100' : 'bg-white hover:bg-gray-50'}
              `}
            >
              <span>운동생활</span>
            </Link>
            <Link
              href='/view/list'
              className={`flex flex-col items-center cursor-pointer px-3 py-2 rounded-xl 
              ${currentPage === 'view' ? 'bg-green-50 text-green-500 hover:bg-green-100' : 'bg-white hover:bg-gray-50'}
              `}
            >
              <span>내주변찾기</span>
            </Link>
          </div>
        </div>
        <div className={'flex items-center gap-6'}>
          <IoIosSearch
            className={'text-gray-700 font-bold text-2xl cursor-pointer'}
          />
          <LuMenu
            className={
              'text-gray-700 font-bold text-2xl cursor-pointer flex md:hidden'
            }
          />
          <div className={'hidden md:flex text-xs font-semibold'}>
            {data.data === null ? (
              <Button
                text={'회원가입/로그인'}
                variant={'outline'}
                onClick={() => router.push('/login')}
              />
            ) : (
              <Link href='/user/mypage/profile'>
                <FaUserCircle
                  className={
                    'text-gray-200 font-bold text-[1.575rem] cursor-pointer'
                  }
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
