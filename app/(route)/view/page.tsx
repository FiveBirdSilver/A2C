'use client'
import Image from 'next/image'

import useAllMap from '@/hooks/common/useAllMap.tsx'

export default function Page() {
  const { mapRef, selectPlace } = useAllMap()

  return (
    <div className='flex items-center justify-center w-full h-full relative'>
      <div ref={mapRef} className='w-full h-full'></div>
      {selectPlace && (
        <div
          className={
            'bg-white absolute w-11/12 bottom-10 rounded-lg shadow-md z-10 flex p-4 gap-4'
          }
        >
          {selectPlace.img && (
            <Image
              src={selectPlace.img}
              alt='climbImg'
              width={100}
              height={100}
              layout='fixed'
              className='rounded-lg w-20 h-20 md:w-28 md:h-28'
            />
          )}
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
