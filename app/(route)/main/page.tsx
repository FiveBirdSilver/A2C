import Image from 'next/image'
import { IoIosArrowForward } from 'react-icons/io'
import MainBannerClient from '@/components/clients/MainBannerClient.tsx'
import MainListClient from '@/components/clients/MainListClient.tsx'

const Card = ({ title, source }: { title: string; source: string }) => {
  return (
    <div className='flex items-center justify-between border px-4 py-2 border-gray-50 bg-white rounded-xl shadow cursor-pointer w-full'>
      <div className={'flex items-center space-x-4 w-full'}>
        <Image
          src={`/icons/${source}.webp`}
          alt={'banner'}
          width={40}
          height={20}
          priority
        />
        <p className={'text-gray-800 text-base font-semibold min-w-60'}>
          {title}
        </p>
      </div>
      <IoIosArrowForward />
    </div>
  )
}

export default async function Page() {
  const data = [
    {
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      location: {
        point: '서울특별시 강남구',
        lat: 37.4979,
        lng: 127.0276,
      },
      _id: '65d8a3f7e3b6c8a74e3b1001',
      title: '서울 강남구 맛집 추천합니다!',
      type: 'review',
      content:
        '강남에서 찾은 최고의 맛집을 공유합니다. 분위기 좋고 음식도 맛있어요!',
      contentType: 'text',
      chatCount: 12,
      viewCount: 345,
      heartCount: 78,
      priceType: 'fixed',
      price: '50000',
      author: {
        nickname: '맛집헌터',
      },
      createdAt: '2024-02-20T10:15:30.000Z',
      updatedAt: '2024-02-21T14:45:10.000Z',
      __v: '1',
    },
    {
      images: [
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
      location: {
        point: '부산 해운대구',
        lat: 35.1587,
        lng: 129.1603,
      },
      _id: '65d8a3f7e3b6c8a74e3b1002',
      title: '해운대에서 서핑할 사람 구합니다!',
      type: 'activity',
      content: '주말에 해운대에서 서핑 함께 하실 분 있나요? 초보 환영!',
      contentType: 'text',
      chatCount: 5,
      viewCount: 198,
      heartCount: 45,
      priceType: 'free',
      price: '0',
      author: {
        nickname: '서핑마스터',
      },
      createdAt: '2024-02-19T08:30:45.000Z',
      updatedAt: '2024-02-20T09:10:12.000Z',
      __v: '1',
    },
    {
      images: ['https://example.com/image5.jpg'],
      location: {
        point: '제주특별자치도 서귀포시',
        lat: 33.252,
        lng: 126.5616,
      },
      _id: '65d8a3f7e3b6c8a74e3b1003',
      title: '제주도 감귤 농장 체험 모집',
      type: 'event',
      content:
        '제주 감귤 농장에서 직접 수확 체험할 수 있는 기회! 가족 단위 환영합니다.',
      contentType: 'text',
      chatCount: 20,
      viewCount: 420,
      heartCount: 90,
      priceType: 'fixed',
      price: '20000',
      author: {
        nickname: '제주농부',
      },
      createdAt: '2024-02-18T12:05:20.000Z',
      updatedAt: '2024-02-19T14:20:15.000Z',
      __v: '1',
    },
    {
      images: ['https://example.com/image6.jpg'],
      location: {
        point: '서울특별시 마포구',
        lat: 37.5563,
        lng: 126.9225,
      },
      _id: '65d8a3f7e3b6c8a74e3b1004',
      title: '홍대에서 중고 카메라 판매합니다',
      type: 'trade',
      content: '소니 A7M3 중고 판매합니다. 상태 양호하며 박스 포함입니다.',
      contentType: 'text',
      chatCount: 8,
      viewCount: 275,
      heartCount: 62,
      priceType: 'negotiable',
      price: '1500000',
      author: {
        nickname: '카메라덕후',
      },
      createdAt: '2024-02-17T16:45:10.000Z',
      updatedAt: '2024-02-18T10:30:50.000Z',
      __v: '1',
    },
    {
      images: ['https://example.com/image7.jpg'],
      location: {
        point: '서울특별시 종로구',
        lat: 37.5723,
        lng: 126.9794,
      },
      _id: '65d8a3f7e3b6c8a74e3b1005',
      title: '광화문에서 무료 야외 콘서트 개최',
      type: 'event',
      content: '야외에서 펼쳐지는 감성적인 콘서트! 누구나 참여 가능합니다.',
      contentType: 'text',
      chatCount: 15,
      viewCount: 380,
      heartCount: 120,
      priceType: 'free',
      price: '0',
      author: {
        nickname: '문화기획자',
      },
      createdAt: '2024-02-16T14:20:10.000Z',
      updatedAt: '2024-02-17T12:00:30.000Z',
      __v: '1',
    },
    {
      images: ['https://example.com/image8.jpg'],
      location: {
        point: '대전광역시 유성구',
        lat: 36.3556,
        lng: 127.3311,
      },
      _id: '65d8a3f7e3b6c8a74e3b1006',
      title: '대전에서 중고 자전거 팝니다',
      type: 'trade',
      content: '로드 자전거 저렴하게 판매합니다. 상태 좋습니다.',
      contentType: 'text',
      chatCount: 10,
      viewCount: 250,
      heartCount: 50,
      priceType: 'negotiable',
      price: '300000',
      author: {
        nickname: '자전거매니아',
      },
      createdAt: '2024-02-15T09:45:00.000Z',
      updatedAt: '2024-02-16T11:30:15.000Z',
      __v: '1',
    },
  ]

  return (
    <main className={'space-y-8 w-full'}>
      <MainBannerClient />
      {/*<div className={'w-full flex justify-center'}>*/}
      {/*  <div className={'w-1/2 flex items-center justify-center'}>*/}
      {/*    <Input*/}
      {/*      id={'mainSearch'}*/}
      {/*      label={''}*/}
      {/*      direction={'row'}*/}
      {/*      placeholder={'무엇이 궁금하신가요'}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className={'flex flex-col justify-center space-y-12'}>
        <div className={'flex flex-wrap gap-4 w-full'}>
          <Card title={'내 주변 클라이밍짐'} source={'map'} />
          <Card title={'A2C에 합류하기'} source={'hands'} />
        </div>
        <MainListClient data={data} />
      </div>
    </main>
  )
}
