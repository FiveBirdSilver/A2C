'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IoCall } from 'react-icons/io5'
import { BsFillPinMapFill } from 'react-icons/bs'

import Error from '@/app/error.tsx'
import Loading from '@/app/loading.tsx'
import useCurrentLocation from '@/hooks/common/useCurrentLocation'
import { useQueries } from '@/hooks/queries/useQueries'
import useMediaQuery from '@/hooks/common/useMediaQuery.tsx'
import useMap, { IMapList } from '@/hooks/common/useMap.tsx'

const ListItem = ({
  list,
  index,
  onClick,
  isSelected,
}: {
  list: IMapList
  index: number
  onClick: () => void
  isSelected: boolean
}) => (
  <div
    className={`flex flex-col w-full cursor-pointer ${isSelected ? 'bg-[#eff7ff]' : 'bg-white'}`}
    onClick={onClick}
  >
    <div className='flex w-full p-4 gap-4'>
      {list.img && (
        <div className='w-32 h-24 md:w-44 md:h-28 relative'>
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
        <div className='flex flex-col gap-1'>
          <p className='text-base font-bold'>{list.name}</p>
          <span className='text-sm text-gray-600'>{list.addr}</span>
        </div>
        <div className='flex justify-between'>
          <button className='text-xs flex items-center justify-center gap-1 text-gray-600'>
            <IoCall className='text-xs' />
            {list.tel ? list.tel : '제공하지 않는 업체'}
          </button>
          <div className='bg-green-50 py-1 px-2 rounded-md flex items-center justify-center'>
            <span className='text-xs text-green-500 font-bold'>
              {list.diff?.toFixed(2)}km
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
  const [currentPlace, setCurrentPlace] = useState<IMapList>()

  const { mapRef, loading, error } = useMap({
    lat: currentPlace?.lat,
    lng: currentPlace?.lng,
  })

  const { isPending, isLoading, isSuccess, isError, data } = useQueries<
    IMapList[]
  >({
    queryKey: `getClimbPlaceList`,
    endpoint: `/python/api/map/GetClimbPlaceList?my_lat=${location?.lat}&my_lng=${location?.lng}`,
    enabled: location !== null,
  })

  if (isError || error)
    return (
      <Error message={'현재 위치에선 클라이밍 정보를 가져올 수 없습니다.'} />
    )

  return (
    <>
      {(isLoading || isPending || loading) && <Loading />}
      <div className='grid md:grid-cols-[4fr_6fr] w-full h-full'>
        <div className='relative overflow-auto'>
          <div className='flex items-center flex-col w-full'>
            {isSuccess &&
              data?.map((list: IMapList, index: number) => (
                <ListItem
                  key={list.id}
                  list={list}
                  index={index}
                  onClick={() => setCurrentPlace(list)}
                  isSelected={currentPlace?.id === list.id}
                />
              ))}
          </div>
          {isMobile && (
            <button className='sticky bottom-10 left-1/2 transform -translate-x-1/2 bg-white flex items-center justify-center z-10 border-gray-200 border rounded-full py-2 px-4 gap-1 shadow-lg'>
              <BsFillPinMapFill className='text-gray-700' />
              <Link
                href='/view/map'
                className='text-sm text-gray-700 font-bold'
              >
                지도보기
              </Link>
            </button>
          )}
        </div>
        <div
          ref={mapRef}
          className={`w-full h-full ${isMobile ? 'hidden' : ''}`}
        />
      </div>
    </>
  )
}
