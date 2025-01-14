'use client'

import { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { IoCall } from 'react-icons/io5'

import Loading from '@/app/loading.tsx'
import useCurrentLocation from '@/hooks/common/useCurrentLocation'
import { useQueries } from '@/hooks/queries/useQueries'
import ErrorTemplate from '@/components/templates/ErrorTemplate'

interface IList {
  id: string
  name: string
  tel: string
  addr: string
  road_addr: string
  img: string
  lat: number
  lng: number
  diff: number
  rank: number
}
const ListItem = ({ list, index }: { list: IList; index: number }) => (
  <div className='flex flex-col w-full'>
    <div className='flex w-full p-4 gap-4'>
      {list.img && (
        <div className='w-36 h-24 md:w-52 md:h-36 relative'>
          <Image
            src={list.img}
            alt={'thumbnail'}
            fill
            priority={index < 5}
            loading={index >= 5 ? 'lazy' : undefined}
            className='rounded-xl object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{ objectFit: 'cover' }}
            placeholder={'blur'}
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
          />
        </div>
      )}
      <div className='flex flex-col justify-between w-full'>
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-bold'>{list.name}</p>
          <span className='text-sm text-gray-600'>{list.addr}</span>
        </div>
        <div className='flex justify-between'>
          <button className='text-xs flex items-center justify-center gap-1 text-gray-600'>
            <IoCall className='text-xs' />
            {list.tel ? list.tel : '제공하지 않는 업체'}
          </button>
          <div className='bg-green-50 px-2 rounded-md'>
            <span className='text-xs text-green-500 font-bold'>
              {list.diff.toFixed(2)}km
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className='border-gray-100 border-[0.5px]' />
  </div>
)

export default function Page() {
  const { location } = useCurrentLocation()
  const { isPending, isLoading, isSuccess, isError, data } = useQueries<
    IList[]
  >({
    queryKey: `getClimbPlaceList`,
    endpoint: `/python/api/map/GetClimbPlaceList?my_lat=${location?.lat}&my_lng=${location?.lng}`,
    enabled: location !== null,
  })

  useEffect(() => {
    const { naver } = window

    if (location && naver)
      naver.maps.Service?.reverseGeocode(
        {
          coords: new window.naver.maps.LatLng(location?.lat, location?.lng),
          orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR,
          ].join(','),
        },
        function (status, response) {
          console.log(response, status)
          if (status !== naver.maps.Service.Status.OK) {
            // return alert('오류가 발생했습니다.')
          }
          const result = response.result
          const items = result.items
          console.log(items)
          // items 배열에서 주소 정보를 확인할 수 있습니다.
        }
      )
  }, [location])

  const renderList = useMemo(() => {
    if (isLoading || isPending) return <Loading />
    if (isError)
      return <ErrorTemplate message={'일시적인 오류가 발생했습니다'} />
    if (data)
      return (
        <div className='relative'>
          <div className='sticky top-10 bg-white flex flex-col items-center justify-center h-16 z-10'>
            <p>강남구 역삼동</p>
          </div>
          {/*<div>가까운순</div>*/}
          <div className='flex items-center flex-col w-full'>
            {data.map((list: IList, index: number) => (
              <ListItem key={list.id} list={list} index={index} />
            ))}
          </div>
        </div>
      )
    return null
  }, [isLoading, isSuccess, isError, data])

  return <>{renderList}</>
}
