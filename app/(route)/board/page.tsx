import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import Loading from '@/app/loading.tsx'
import Tabs from '@/components/elements/Tabs.tsx'
import BoardListClient from '@/components/clients/BoardListClient.tsx'
import BoardListAroundClient from '@/components/clients/BoardListAroundClient.tsx'

type Props = {
  searchParams: Promise<{ type: string }>
}

interface IBoard {
  data: {
    images: string[]
    location: {
      point: string
      lat: number
      lng: number
    }
    _id: string
    title: string
    type: string
    content: string
    contentType: string
    chatCount: number
    viewCount: number
    heartCount: number
    priceType: string
    price: string
    author: {
      nickname: string
    }
    createdAt: string
    updatedAt: string
    __v: string
  }[]
}

// 초기데이터만 SSR 이후부터 CSR => 초기 렌더링 속도 및 SEO를 위함
async function fetchBoard(sessionId?: { name: string; value: string }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board?page=1`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${sessionId?.name}=${sessionId?.value}`,
    },
    credentials: 'include',
  })

  return res.json()
}

export default async function Page({ searchParams }: Props) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')
  const type = (await searchParams).type
  const data: IBoard = await fetchBoard(sessionId)

  return (
    <Suspense fallback={<Loading />}>
      <div className='flex flex-col items-start justify-center'>
        <Tabs
          items={[
            { label: '전체', value: 'all' },
            { label: '구해요', value: 'find' },
            { label: '같이해요', value: 'together' },
            { label: '궁금해요', value: 'community' },
          ]}
          checkedItem={type}
        />
      </div>
      <div className='grid gap-8 md:grid-cols-3 grid-cols-1'>
        <main className='col-span-1 md:col-span-2'>
          <div className='flex flex-col w-full gap-5 bg-[#f8f9fa] md:bg-white'>
            <BoardListClient initialData={data.data} />
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
            <BoardListAroundClient />
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
            <Link href={'/board/write'}>
              <button className='flex items-center py-4 text-sm font-semibold text-green-500 bg-green-100 rounded-xl hover:bg-green-200 w-full justify-center '>
                글 작성
              </button>
            </Link>
          </div>
        </aside>
        <Link
          className='fixed md:hidden bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white z-10 bottom-12 right-4 cursor-pointer'
          href={'/board/write'}
        >
          <HiOutlinePencilAlt />
        </Link>
      </div>
    </Suspense>
  )
}
