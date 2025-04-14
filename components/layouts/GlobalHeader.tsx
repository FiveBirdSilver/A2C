'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LuMenu } from 'react-icons/lu'
import { IoCloseOutline } from 'react-icons/io5'

import Button from '@/components/ui/Button'
import { useAccountQuery } from '@/hooks/queries/useAccountQuery'

interface NavBoxProps {
  path: string
  text: string
  params?: string
}

export default function GlobalHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState(false)
  const isLoggin = useAccountQuery()

  const MovOnMenu = (url: string) => {
    router.push(url)
    setOpenMenu(false)
  }

  // 상단 네이베이션
  const NavBox = ({ path, text }: NavBoxProps) => {
    const isActive = pathname.startsWith(`/${path}`)

    return (
      <Link
        href={`/${path}`}
        className={`flex flex-col items-center cursor-pointer px-3 py-2 rounded-xl 
          ${isActive ? 'bg-green-50 text-green-500 hover:bg-green-100' : 'bg-white hover:bg-gray-50'}`}
      >
        <span>{text}</span>
      </Link>
    )
  }

  return (
    <div className='flex fixed top-0 w-full border-b border-gray-100 left-0 z-[9999]'>
      <div className='flex items-center bg-white mx-auto justify-between px-4 md:px-0 my-0 h-14 w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg'>
        <div className={'flex items-center gap-4 z-10'}>
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
              <NavBox path={'board/life'} text={'운동생활'} />
              <NavBox path={'board/community'} text={'커뮤니티'} />
              <NavBox path={'view/list'} text={'내주변찾기'} />
            </nav>
          )}
        </div>
        <div className={'flex items-center gap-6 z-10'}>
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
            {(() => {
              // 1. 로딩 상태 처리
              if (isLoggin.isLoading) {
                // 로딩 중일 때 스켈레톤 UI 표시 (예: pulse 애니메이션 추가)
                return (
                  <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse'></div>
                )
              }

              // 2. 에러 상태 처리
              if (isLoggin.isError) {
                // 데이터 로드 실패 시 (네트워크 오류, 서버 오류 등 401 외)
                console.error('계정 정보 로드 오류:', isLoggin.error) // 개발/디버깅을 위해 에러 로깅
                return (
                  <Button
                    variant={'outline'}
                    onClick={() => router.push('/login')}
                    size='sm'
                  >
                    회원가입/로그인
                  </Button>
                )
              }
              // getCheckAccount에서 401시 null을 반환하므로 !isLoggin.data 로 체크하는 것이 핵심
              if (!isLoggin.data || !isLoggin.data.data) {
                return (
                  <Button
                    variant={'outline'}
                    onClick={() => router.push('/login')}
                    size='sm'
                  >
                    회원가입/로그인
                  </Button>
                )
              } else {
                return (
                  <div className='flex items-center gap-2'>
                    <Image
                      // src={isLoggin.data.data.profileImageUrl || '/icons/user.webp'} // 실제 유저 프로필 이미지가 있다면 사용
                      src={'/icons/user.webp'}
                      alt={isLoggin.data.data.nickname || 'profile'} // alt 텍스트에 닉네임 활용
                      priority
                      width={30}
                      height={30}
                      onClick={() => router.push('/user/mypage/profile')}
                      className='cursor-pointer rounded-full' // 원형 프로필처럼 보이도록
                    />
                  </div>
                )
              }
            })()}
          </div>
        </div>

        {/*모바일 버전 => 열린 메뉴*/}
        {openMenu && (
          <ul
            className={
              'fixed top-0 left-0 py-[4.5rem] w-full h-full bg-white space-y-6'
            }
          >
            <li
              className={'px-6 text-base cursor-pointer'}
              onClick={() => MovOnMenu('/board/life')}
            >
              운동생활
            </li>
            <li
              className={'px-6 text-base cursor-pointer'}
              onClick={() => MovOnMenu('/board/community')}
            >
              커뮤니티
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
              className={'px-6 text-base cursor-pointer'}
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
