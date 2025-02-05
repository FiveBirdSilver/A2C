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
  console.log('url', url)
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

  console.log(data)
  // const data = {
  //   data: [
  //     {
  //       images: [
  //         'https://example.com/image1.jpg',
  //         'https://example.com/image2.jpg',
  //       ],
  //       location: {
  //         point: '서울특별시 강남구',
  //         lat: 37.4979,
  //         lng: 127.0276,
  //       },
  //       _id: '65d8a3f7e3b6c8a74e3b1001',
  //       title: '서울 강남구 맛집 추천합니다!',
  //       type: 'review',
  //       content:
  //         '강남에서 찾은 최고의 맛집을 공유합니다. 분위기 좋고 음식도 맛있어요!',
  //       contentType: 'text',
  //       chatCount: 12,
  //       viewCount: 345,
  //       heartCount: 78,
  //       priceType: 'fixed',
  //       price: '50000',
  //       author: {
  //         nickname: '맛집헌터',
  //       },
  //       createdAt: '2024-02-20T10:15:30.000Z',
  //       updatedAt: '2024-02-21T14:45:10.000Z',
  //       __v: '1',
  //     },
  //     {
  //       images: [
  //         'https://example.com/image3.jpg',
  //         'https://example.com/image4.jpg',
  //       ],
  //       location: {
  //         point: '부산 해운대구',
  //         lat: 35.1587,
  //         lng: 129.1603,
  //       },
  //       _id: '65d8a3f7e3b6c8a74e3b1002',
  //       title: '해운대에서 서핑할 사람 구합니다!',
  //       type: 'activity',
  //       content: '주말에 해운대에서 서핑 함께 하실 분 있나요? 초보 환영!',
  //       contentType: 'text',
  //       chatCount: 5,
  //       viewCount: 198,
  //       heartCount: 45,
  //       priceType: 'free',
  //       price: '0',
  //       author: {
  //         nickname: '서핑마스터',
  //       },
  //       createdAt: '2024-02-19T08:30:45.000Z',
  //       updatedAt: '2024-02-20T09:10:12.000Z',
  //       __v: '1',
  //     },
  //     {
  //       images: ['https://example.com/image5.jpg'],
  //       location: {
  //         point: '제주특별자치도 서귀포시',
  //         lat: 33.252,
  //         lng: 126.5616,
  //       },
  //       _id: '65d8a3f7e3b6c8a74e3b1003',
  //       title: '제주도 감귤 농장 체험 모집',
  //       type: 'event',
  //       content:
  //         '제주 감귤 농장에서 직접 수확 체험할 수 있는 기회! 가족 단위 환영합니다.',
  //       contentType: 'text',
  //       chatCount: 20,
  //       viewCount: 420,
  //       heartCount: 90,
  //       priceType: 'fixed',
  //       price: '20000',
  //       author: {
  //         nickname: '제주농부',
  //       },
  //       createdAt: '2024-02-18T12:05:20.000Z',
  //       updatedAt: '2024-02-19T14:20:15.000Z',
  //       __v: '1',
  //     },
  //     {
  //       images: ['https://example.com/image6.jpg'],
  //       location: {
  //         point: '서울특별시 마포구',
  //         lat: 37.5563,
  //         lng: 126.9225,
  //       },
  //       _id: '65d8a3f7e3b6c8a74e3b1004',
  //       title: '홍대에서 중고 카메라 판매합니다',
  //       type: 'trade',
  //       content: '소니 A7M3 중고 판매합니다. 상태 양호하며 박스 포함입니다.',
  //       contentType: 'text',
  //       chatCount: 8,
  //       viewCount: 275,
  //       heartCount: 62,
  //       priceType: 'negotiable',
  //       price: '1500000',
  //       author: {
  //         nickname: '카메라덕후',
  //       },
  //       createdAt: '2024-02-17T16:45:10.000Z',
  //       updatedAt: '2024-02-18T10:30:50.000Z',
  //       __v: '1',
  //     },
  //     {
  //       images: [
  //         'https://example.com/image7.jpg',
  //         'https://example.com/image8.jpg',
  //       ],
  //       location: {
  //         point: '강원도 강릉시',
  //         lat: 37.7518,
  //         lng: 128.876,
  //       },
  //       _id: '65d8a3f7e3b6c8a74e3b1005',
  //       title: '강릉 카페 추천! 바다 보이는 곳',
  //       type: 'review',
  //       content: '강릉에서 가장 예쁜 카페 찾았습니다! 바다 전망 최고입니다.',
  //       contentType: 'text',
  //       chatCount: 3,
  //       viewCount: 150,
  //       heartCount: 30,
  //       priceType: 'free',
  //       price: '0',
  //       author: {
  //         nickname: '카페투어러',
  //       },
  //       createdAt: '2024-02-16T09:20:00.000Z',
  //       updatedAt: '2024-02-17T11:10:30.000Z',
  //       __v: '1',
  //     },
  //   ],
  // }

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
            {/*<BoardListClient initialData={data.data} />*/}
          </div>
        </main>
        <aside className='hidden md:flex md:col-span-1'>
          <div className='sticky top-20'>
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
