import Image from 'next/image'
import { IoIosArrowForward } from 'react-icons/io'
import MainBannerClient from '@/components/clients/MainBannerClient.tsx'
import MainListClient from '@/components/clients/MainListClient.tsx'
import Link from 'next/link'

// API로부터 게시판 데이터를 가져오는 비동기 함수
async function fetchBoard() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board?page=1`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  return res.json()
}

// 카드 컴포넌트 - 제목과 아이콘을 보여주는 UI 요소
const Card = ({
  title,
  source,
  link,
}: {
  title: string
  source: string
  link: string
}) => {
  return (
    <div className={'w-full'}>
      <Link
        href={link}
        className='flex items-center justify-between border px-4 py-2 border-gray-50 bg-white rounded-xl shadow cursor-pointer w-full'
      >
        <div className={'flex items-center space-x-4 w-full'}>
          {/* 카드 아이콘 이미지 */}
          <Image
            src={`/icons/${source}.webp`} // 동적 아이콘 소스
            alt={'banner'} // 이미지 설명
            width={40} // 이미지 너비
            height={20} // 이미지 높이
            priority // 우선적으로 로드되는 이미지로 설정
          />
          {/* 카드 제목 */}
          <p className={'text-gray-800 text-sm md:text-base min-w-60'}>
            {title}
          </p>
        </div>

        {/* 오른쪽 화살표 아이콘 */}
        <IoIosArrowForward />
      </Link>
    </div>
  )
}

// 메인 페이지 컴포넌트
export default async function Page() {
  // API에서 데이터를 비동기적으로 가져옴
  const data = await fetchBoard()

  return (
    <main className={'space-y-8 w-full'}>
      {/* 배너 컴포넌트 */}
      <MainBannerClient />
      <div className={'flex flex-col justify-center space-y-12 px-3 md:px-0'}>
        <div className={'flex flex-col md:flex-row gap-4 w-full'}>
          <Card
            title={'내 주변 클라이밍짐'}
            source={'map'}
            link={'/view/list'}
          />
          <Card
            title={'A2C에 합류하기'}
            source={'hands'}
            link={'/board?type='}
          />
        </div>
        {/* 게시판 리스트 컴포넌트 - API에서 받아온 데이터를 전달 */}
        <MainListClient data={data.data} />
      </div>
    </main>
  )
}
