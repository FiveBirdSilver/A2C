'use client'
import Image from 'next/image'
import { useMemo } from 'react'
import { HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi2'
import { CiLocationArrow1 } from 'react-icons/ci'

import Loading from '@/app/loading.tsx'
import useAllMap from '@/hooks/common/useAllMap.tsx'
import ErrorTemplate from '@/components/templates/ErrorTemplate.tsx'

export default function Page() {
  const {
    loading,
    error,
    mapRef,
    selectPlace,
    moveToCurrentLocation,
    zoomIn,
    zoomOut,
  } = useAllMap({})

  const renderBeforeMap = useMemo(() => {
    if (loading) return <Loading />
    if (error)
      return (
        <ErrorTemplate
          message={'현재 위치에서 주변 클라이밍 시설을 불러오지 못했습니다'}
        />
      )
    if (!loading && !error)
      return (
        <div className='absolute left-6 md:left-10 top-4 flex flex-col gap-4'>
          <div className='flex flex-col bg-white rounded-lg p-2 shadow-[0_2px_14px_rgba(0,0,0,0.12)] opacity-90'>
            <button onClick={zoomIn}>
              <HiOutlinePlus className='text-2xl text-gray-600' />
            </button>
            <p className='border-b border-b-gray-200 h-2 mb-1'></p>
            <button onClick={zoomOut}>
              <HiOutlineMinus className='text-2xl text-gray-600' />
            </button>
          </div>
          <button
            className='bg-white rounded-lg p-2 shadow-[0_2px_14px_rgba(0,0,0,0.12)] opacity-90'
            onClick={moveToCurrentLocation}
          >
            <CiLocationArrow1 className='text-2xl text-gray-600' />
          </button>
        </div>
      )
  }, [loading, error])

  return (
    <div className='flex items-center justify-center w-full h-full relative'>
      <div ref={mapRef} className='w-full h-full'>
        {renderBeforeMap}
      </div>
      {selectPlace && (
        <div
          className={
            'bg-white absolute w-11/12 bottom-5 rounded-lg shadow-md z-10 flex p-4 gap-4'
          }
        >
          <div className='w-20 h-20 md:w-28 md:h-28 relative'>
            {selectPlace.img && (
              <Image
                src={selectPlace.img}
                alt='climbImg'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                style={{ objectFit: 'cover' }}
                placeholder={'blur'}
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
                priority
                // className='rounded-lg w-20 h-20 md:w-28 md:h-28'
                className='rounded-lg object-cover'
              />
            )}
          </div>
          <div className={'flex flex-col justify-between'}>
            <div className={'max-w-52 md:max-w-lg lg:max-w-3xl'}>
              <p className={'font-bold'}>{selectPlace.name}</p>
              <p className='text-sm overflow-hidden whitespace-nowrap text-ellipsis break-all text-gray-400'>
                {selectPlace.road_addr}
              </p>
            </div>
            <div className={'max-w-52 md:max-w-lg lg:max-w-3xl'}>
              <p className='text-xs overflow-hidden whitespace-nowrap text-ellipsis break-all'>
                {selectPlace.info}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
