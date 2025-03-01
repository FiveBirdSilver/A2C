import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { HiOutlinePencilAlt } from 'react-icons/hi'

import Loading from '@/app/loading.tsx'
import BoardListClient from '@/components/clients/BoardListClient.tsx'
import BoardListAroundClient from '@/components/clients/BoardListAroundClient.tsx'

interface IBoardList {
  data: {
    images: string[]
    location: {
      point: string
      type: string
      coordinates: number[]
    }
    _id: string
    title: string
    type: string
    content: string
    contentType: string
    commentCount: number
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

interface IFetchBoard {
  sessionId: { name: string; value: string } | undefined
}

// 초기데이터만 SSR 이후부터 CSR => 초기 렌더링 속도 및 SEO를 위함
async function fetchBoard({ sessionId }: IFetchBoard) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board?page=1&contentType=life`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${sessionId?.name}=${sessionId?.value}`,
    },
    credentials: 'include',
  })

  return res.json()
}

export default async function Page() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')

  // 카테고리 파라미터
  const data: IBoardList = await fetchBoard({ sessionId })

  return (
    <Suspense fallback={<Loading />}>
      <div className='grid gap-8 md:grid-cols-3 grid-cols-1 pt-6'>
        <main className='col-span-1 md:col-span-2'>
          <div
            className={`flex flex-col w-full gap-5 md:bg-white ${data.data.length > 0 ? 'bg-[#f8f9fa]' : 'bg-white'}`}
          >
            <BoardListClient initialData={data.data} type={'life'} />
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
          className='fixed md:hidden bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white bottom-12 right-4 cursor-pointer'
          href={'/board/write'}
        >
          <HiOutlinePencilAlt />
        </Link>
      </div>
    </Suspense>
  )
}
