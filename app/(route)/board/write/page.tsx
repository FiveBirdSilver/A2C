import { Suspense } from 'react'
import BoardWriteClient from '@/components/clients/BoardWriteClient.tsx'
import { IMapList } from '@/hooks/common/useMap.tsx'
import Loading from '@/app/loading.tsx'

// 클라이밍 장소 선택을 위한 리스트 데이터
// async function fetchList() {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/python/api/map/GetClimbPlaceList?my_lat=0&my_lng=0`
//   const res = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//   })
//
//   return res.json()
// }
export default async function Page() {
  // const data: IMapList[] = await fetchList()
  const data: IMapList[] = [
    {
      addr: '서울특별시 강남구 테헤란로 123',
      id: '1',
      info: '강남의 대표적인 랜드마크',
      img: 'https://via.placeholder.com/150',
      lat: 37.501317,
      lng: 127.039585,
      name: '강남 랜드마크',
      road_addr: '서울특별시 강남구 테헤란로 123',
      tel: '02-1234-5678',
      diff: 2,
      rank: 1,
    },
    {
      addr: '부산광역시 해운대구 해운대해변로 456',
      id: '2',
      info: '부산의 아름다운 해변',
      img: 'https://via.placeholder.com/150',
      lat: 35.158698,
      lng: 129.160384,
      name: '해운대 해수욕장',
      road_addr: '부산광역시 해운대구 해운대해변로 456',
      tel: '051-9876-5432',
      diff: 5,
      rank: 2,
    },
    {
      addr: '대구광역시 중구 동성로 789',
      id: '3',
      info: '대구의 젊음의 거리',
      img: 'https://via.placeholder.com/150',
      lat: 35.867972,
      lng: 128.596086,
      name: '동성로',
      road_addr: '대구광역시 중구 동성로 789',
      tel: '053-2468-1357',
      diff: 3,
      rank: 3,
    },
    {
      addr: '인천광역시 연수구 송도국제대로 987',
      id: '4',
      info: '송도의 대표적인 국제도시',
      img: 'https://via.placeholder.com/150',
      lat: 37.385052,
      lng: 126.633448,
      name: '송도 국제도시',
      road_addr: '인천광역시 연수구 송도국제대로 987',
      tel: '032-7894-5612',
      diff: 1,
      rank: 4,
    },
    {
      addr: '광주광역시 동구 충장로 654',
      id: '5',
      info: '광주의 패션과 문화 거리',
      img: 'https://via.placeholder.com/150',
      lat: 35.152499,
      lng: 126.915682,
      name: '충장로',
      road_addr: '광주광역시 동구 충장로 654',
      tel: '062-3333-4444',
      diff: 4,
      rank: 5,
    },
    {
      addr: '제주특별자치도 서귀포시 중문관광로 321',
      id: '6',
      info: '제주의 대표적인 관광지',
      img: 'https://via.placeholder.com/150',
      lat: 33.249599,
      lng: 126.408494,
      name: '중문 관광단지',
      road_addr: '제주특별자치도 서귀포시 중문관광로 321',
      tel: '064-1234-5678',
    },
  ]

  return (
    <Suspense fallback={<Loading />}>
      <BoardWriteClient data={data} />
    </Suspense>
  )
}
