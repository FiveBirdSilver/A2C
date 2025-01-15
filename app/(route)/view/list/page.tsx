'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { IoCall } from 'react-icons/io5'
import { BsFillPinMapFill } from 'react-icons/bs'

import Loading from '@/app/loading.tsx'
import useCurrentLocation from '@/hooks/common/useCurrentLocation'
import { useQueries } from '@/hooks/queries/useQueries'
import ErrorTemplate from '@/components/templates/ErrorTemplate'
import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'

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
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { isPending, isLoading, isSuccess, isError, data } = useQueries<
    IList[]
  >({
    queryKey: `getClimbPlaceList`,
    endpoint: `/python/api/map/GetClimbPlaceList?my_lat=${location?.lat}&my_lng=${location?.lng}`,
    enabled: location !== null,
  })

  const renderList = useMemo(() => {
    if (isLoading || isPending) return <Loading />
    if (isError)
      return <ErrorTemplate message={'일시적인 오류가 발생했습니다'} />
    if (data)
      return (
        <div className='relative'>
          {/*<div className='sticky top-12 bg-white flex flex-col items-center justify-center h-16 z-10'>*/}
          {/*  <p>강남구 역삼동</p>*/}
          {/*</div>*/}
          <div className='flex items-center flex-col w-full'>
            {data.map((list: IList, index: number) => (
              <ListItem key={list.id} list={list} index={index} />
            ))}
          </div>
          {isMobile && (
            <button className='sticky bottom-10 left-1/2 transform -translate-x-1/2 bg-white flex items-center justify-center z-10 border-gray-200 border rounded-full py-2 px-4 gap-1 shadow-lg'>
              <BsFillPinMapFill className='text-gray-700' />
              <span className='text-sm text-gray-700 font-bold'>지도보기</span>
            </button>
          )}
          {/*<div ref={mapRef} className='w-full h-full'></div>*/}
        </div>
      )
    return null
  }, [isLoading, isSuccess, isError, data])

  return <>{renderList}</>
}
