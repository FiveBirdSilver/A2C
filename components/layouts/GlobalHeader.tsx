'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoIosSearch } from 'react-icons/io'
import { LuMenu } from 'react-icons/lu'
import { FaUserCircle } from 'react-icons/fa'

interface IAccount {
  result: {
    email: string
    nickname: string
  }
  message: string
}

export default function GlobalHeader(data: { data: IAccount }) {
  return (
    <div className='flex fixed top-0 w-full border-b border-gray-100 left-0 z-10 '>
      <div className='flex items-center bg-white mx-auto justify-between px-4 md:px-0 my-0 h-14 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
        <div className={'flex items-center gap-8'}>
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
          <div className='hidden text-gray-700 text-sm gap-8 md:flex'>
            <Link
              href='/board'
              className='flex flex-col items-center cursor-pointer'
            >
              <span>운동생활</span>
            </Link>
            <Link
              href='/view/list'
              className='flex flex-col items-center cursor-pointer'
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
          <div className={'hidden md:flex'}>
            {data.data === null ? (
              <Link href='/login'>
                <button
                  className={
                    'text-xs text-green-500 border-gray-200 border rounded-md px-2 h-8 flex justify-center items-center font-bold'
                  }
                >
                  회원가입/로그인
                </button>
              </Link>
            ) : (
              <Link href='/user/mypage'>
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
