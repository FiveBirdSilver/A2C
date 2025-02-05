'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const currentPage = pathname.split('/')[3]

  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
      <aside className='w-full relative md:w-64 p-4 rounded-lg order-1 md:order-2'>
        {/*사용자 닉네임*/}
        <div className='flex flex-col gap-2 md:items-center pl-2 md:pl-0'>
          <h2 className='text-base font-semibold text-gray-900'>버드실버</h2>
        </div>

        {/*사이드 네비게이션*/}
        <nav className='grid justify-center items-center grid-cols-2 md:flex md:flex-col flex-1 mt-6 text-sm'>
          <Link
            href='/user/mypage/profile'
            className={`flex md:w-full px-3 py-2 rounded ${
              currentPage === 'profile'
                ? 'bg-green-50 text-green-500'
                : 'bg-white text-gray-700 hover:text-green-500'
            }`}
          >
            기본 프로필
          </Link>
          <Link
            href='/user/mypage/myposts'
            className={`flex md:w-full px-3 py-2 rounded ${
              currentPage === 'myposts'
                ? 'bg-green-50 text-green-500'
                : 'bg-white text-gray-700 hover:text-green-500'
            }`}
          >
            내 작성 글
          </Link>
          <div className='absolute right-4 bottom-12 md:static md:flex md:w-full md:border-t border-gray-100 px-3 py-4 my-4'>
            <a
              href='#'
              className='text-xs underline md:no-underline md:text-sm text-gray-400'
            >
              로그아웃
            </a>
          </div>
        </nav>
      </aside>
      <main className='flex-1 order-2 md:order-1 px-4 py-8 md:py-4'>
        {children}
      </main>
    </div>
  )
}
