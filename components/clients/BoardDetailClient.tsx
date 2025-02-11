'use client'

import { useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import Input from '@/components/elements/Input.tsx'
import { setCookie } from '@/app/actions.ts'

const BoardDetailClient = ({
  cookie,
  name,
  lng,
  lat,
  title,
  nickname,
  createdAt,
  content,
  viewCount,
  heartCount,
}: {
  endpoint?: string
  cookie: string | null
  name: string
  lng: number
  lat: number
  title: string
  nickname: string
  createdAt: string
  content: string
  viewCount: number
  heartCount: number
  comments: string[]
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null)

  // 계속된 조회수 증가를 막기 위한 쿠키 저장
  useEffect(() => {
    const viewCookie = async () => {
      if (cookie) await setCookie(cookie)
    }

    viewCookie()
  }, [cookie])

  useEffect(() => {
    const { naver } = window
    if (mapRef.current && naver) {
      const center = new naver.maps.LatLng(lat, lng)
      const map = new naver.maps.Map(mapRef.current, {
        center: center,
        zoom: 15,
      })

      // 마커 생성
      new naver.maps.Marker({
        position: center,
        map: map,
        title: name,
        icon: {
          content: `
            <div style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
              <svg width="30" height="30" fill="#0080ff" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="-39.57 -39.57 474.85 474.85" xml:space="preserve" stroke="#0080ff">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path> </g> </g></svg>
            </div>`,
        },
      })

      const bounds = new naver.maps.LatLngBounds(center, center)
      bounds.extend(center)
      map.fitBounds(bounds)
    }
  }, [lat, lng])

  return (
    <div className='col-span-1 md:col-span-5'>
      {/*작성자 및 작성시각*/}
      <div className='border-b border-gray-200 px-4 py-2'>
        <h1 className='text-2xl text-gray-800'>{title}</h1>
        <div className='flex items-center justify-between gap-2 mt-4 text-sm text-gray-400'>
          <p className='font-medium text-xs'>구해요</p>
          <div className='flex items-center gap-2 text-xs'>
            <span>{nickname}</span>
            <span>|</span>
            <span>{dayjs(createdAt).format('YYYY-MM-DD')}</span>
          </div>
        </div>
      </div>

      {/*내용 및 이미지*/}
      <div className='flex flex-col gap-4 p-4 w-full'>
        <div className='min-h-40'>
          <span className='text-sm'>{content}</span>
        </div>

        {/*위치 (지도) */}
        <div className='flex flex-col gap-3'>
          <span className='text-xs'>위치</span>
          <div className='w-full h-60 md:h-48'>
            <div ref={mapRef} className='w-full h-full rounded-lg border' />
          </div>
        </div>

        {/*조회수 및 좋아요수 */}
        <dl className='flex justify-end border-b border-gray-200 px-4 py-2 gap-2 mt-4 text-xs text-gray-400'>
          <dt>조회 {viewCount?.toLocaleString()}</dt>
          <span>·</span>
          <dt>좋아요 {heartCount?.toLocaleString()}</dt>
        </dl>
      </div>

      {/*댓글*/}
      <div className='w-full px-4 space-y-4'>
        <div className={'flex space-x-2 items-center text-base pl-2'}>
          <span className={'text-gray-700'}>댓글</span>
          <span className={'text-green-400 md:font-semibold'}>
            {/*{data.data?.comments?.length || 0}*/}
          </span>
        </div>
        <Input
          id={'comments'}
          label={''}
          direction={'row'}
          placeholder={'댓글을 입력해주세요.'}
        />
      </div>
    </div>
  )
}

export default BoardDetailClient
