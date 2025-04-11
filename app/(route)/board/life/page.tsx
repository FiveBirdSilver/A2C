import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import Loading from '@/app/loading.tsx'
import PostListClient from '@/components/clients/PostListClient.tsx'
import NearbyPeopleClient from '@/components/clients/NearbyPeopleClient.tsx'

interface IFetchBoard {
  sessionId: { name: string; value: string } | undefined
}

// 초기데이터만 SSR 이후부터 CSR => 초기 렌더링 속도 및 SEO를 위함
async function fetchBoard({ sessionId }: IFetchBoard) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board?page=1&contentType=life`
  const cookieHeader = sessionId ? `${sessionId.name}=${sessionId.value}` : ''
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    credentials: 'include',
  })

  return res.json()
}

export default async function Page() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')

  // 카테고리 파라미터
  const data = await fetchBoard({ sessionId })

  return (
    <Suspense fallback={<Loading />}>
      <div className='grid gap-8 md:grid-cols-3 grid-cols-1 pt-6'>
        <main className='col-span-1 md:col-span-2'>
          <div
            className={`flex flex-col w-full gap-5 md:bg-white ${data.data.length > 0 ? 'bg-[#f8f9fa]' : 'bg-white'}`}
          >
            <PostListClient initialData={data.data} type={'life'} />
          </div>
        </main>
        <aside className='hidden md:flex flex-col md:col-span-1 h-screen sticky top-20 overflow-visible'>
          <div className={'flex flex-col gap-2'}>
            <div className='flex items-center gap-2'>
              <Image
                src={'/icons/pin.webp'}
                width={20}
                height={20}
                alt={'pin'}
              />
              <span className={'text-gray-700 text-sm'}>
                바로 내 근처에 있어요
              </span>
            </div>
            <NearbyPeopleClient />
          </div>
          <div className={'flex flex-col gap-2'}>
            <div className='flex items-center gap-2'>
              <Image
                src={'/icons/highfive.webp'}
                width={20}
                height={20}
                alt={'highfive'}
              />
              <span className={'text-gray-700 text-sm'}>
                클라이밍 궁금증을 나누고 새 파트너를 만나보세요
              </span>
            </div>
            <Link href={'write?type=life'}>
              <button className='flex items-center py-4 text-sm font-semibold text-green-500 bg-green-100 rounded-xl hover:bg-green-200 w-full justify-center '>
                글 작성
              </button>
            </Link>
          </div>
        </aside>
        <Link
          className='fixed md:hidden bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white bottom-12 right-4 cursor-pointer'
          href={'write?type=life'}
        >
          <HiOutlinePencilAlt />
        </Link>
      </div>
    </Suspense>
  )
}
