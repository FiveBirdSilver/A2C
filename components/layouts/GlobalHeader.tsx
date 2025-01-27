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
      <div className='flex items-center bg-white mx-auto justify-between px-4 my-0 h-14 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
        <div className={'flex items-center gap-8'}>
          <Link href={'/'} className='flex items-center gap-1'>
            <Image
              src={'/logo.jpeg'}
              width={27}
              height={27}
              alt='logo'
              priority
              className='mb-1'
            />
            <Image
              src={'/logo_text.jpeg'}
              width={55}
              height={20}
              alt='logo'
              priority
            />
          </Link>
          <div className='hidden text-gray-700 text-[0.945rem] gap-8 font-bold md:flex'>
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
        <div className={'flex items-center gap-4'}>
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
                    'text-xs text-green-500 border-gray-200 border rounded-md px-2 py-[6px] font-bold'
                  }
                >
                  회원가입/로그인
                </button>
              </Link>
            ) : (
              <FaUserCircle
                className={
                  'text-gray-200 font-bold text-[1.575rem] cursor-pointer'
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
