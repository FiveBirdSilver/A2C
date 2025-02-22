'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LuMenu } from 'react-icons/lu'
import { IoCloseOutline } from 'react-icons/io5'

import Button from '@/components/elements/Button.tsx'

interface IAccount {
  result: string
  data: {
    _id: string
    email: string
    nickname: string
  }
}
export default function GlobalHeader(data: { data: IAccount }) {
  const router = useRouter()
  const pathname = usePathname()
  const currentPage = pathname.split('/')[1]
  const [openMenu, setOpenMenu] = useState(false)

  const MovOnMenu = (url: string) => {
    router.push(url)
    setOpenMenu(false)
  }

  return (
    <div className='flex fixed top-0 w-full border-b border-gray-100 left-0 z-10 '>
      <div className='flex items-center bg-white mx-auto justify-between px-4 md:px-0 my-0 h-14 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
        <div className={'flex items-center gap-4'}>
          {/*로고 => 클릭시 메인 페이지로 이동*/}
          <Link href={'/'} className='flex items-center gap-1'>
            <Image
              src={'/logo/logo_mobile.png'}
              width={45}
              height={20}
              alt='logo'
              priority
              className='md:hidden'
            />
            <Image
              src={'/logo/logo.png'}
              width={100}
              height={55}
              alt='logo'
              priority
              className='hidden md:flex'
            />
          </Link>

          {/*메인페이지에서는 네비게이션 필요 없음*/}
          {pathname.split('/')[1] !== 'main' && (
            <nav className='hidden text-gray-700 text-sm gap-3 md:flex'>
              <Link
                href='/board?type='
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
            </nav>
          )}
        </div>
        <div className={'flex items-center gap-6'}>
          {/*모바일 버전 => 메뉴 플래그 */}
          {!openMenu && (
            <LuMenu
              className={
                'text-gray-700 font-bold text-2xl cursor-pointer flex md:hidden'
              }
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          )}
          {openMenu && (
            <IoCloseOutline
              className={
                'text-gray-700 font-bold text-2xl cursor-pointer flex md:hidden'
              }
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          )}

          {/*로그인 여부에 따른 다른 UI*/}
          <div className={'hidden md:flex text-xs font-semibold'}>
            {!data.data ? (
              <Button
                text={'회원가입/로그인'}
                variant={'outline'}
                onClick={() => router.push('/login')}
              />
            ) : (
              <Image
                src={'/icons/user.webp'}
                alt={'profile'}
                priority
                width={30}
                height={30}
                onClick={() => router.push('/user/mypage/profile')}
                className='cursor-pointer'
              />
            )}
          </div>
        </div>

        {/*모바일 버전 => 열린 메뉴*/}
        {openMenu && (
          <ul
            className={
              'fixed left-0 py-6 top-16 w-full h-full bg-white space-y-6'
            }
          >
            <li
              className={'px-6 text-base cursor-pointer'}
              onClick={() => MovOnMenu('/board?type=')}
            >
              운동생활
            </li>
            <li
              className={
                'border-b border-gray-100 pb-6 px-6 text-base cursor-pointer'
              }
              onClick={() => MovOnMenu('/view/list')}
            >
              내 주변 찾기
            </li>
            <li
              className={'px-6 text-base'}
              onClick={() => MovOnMenu('/user/mypage')}
            >
              MY AC2
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
