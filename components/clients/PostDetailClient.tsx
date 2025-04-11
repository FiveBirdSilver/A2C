'use client'

import { KeyboardEvent, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import debounce from 'lodash/debounce'
import Image from 'next/image'

import { setBoardCookieAction } from '@/app/actions/setBoardCookieAction.ts'
import Input from '@/components/ui/Input'
import typeItems from '@/constants/boardTypeItems.json'
import { useBoardCommentMutation } from '@/hooks/mutations/useBoardCommentMutation.tsx'
import { usePathname } from 'next/navigation'
import timeAgo from '@/libs/utils/timeAgo.ts'

export interface IPostDetail {
  cookie: string | null
  contentType: string
  location?: {
    point: string
    coordinates: number[]
  }
  images: string[]
  title: string
  nickname: string
  createdAt: string
  content: string
  viewCount: number
  heartCount: number
  comments: {
    _id: string
    author: {
      nickname: string
    }
    content: string
    board: string
    parentCommentId: string
    createdAt: string
    updatedAt: string
  }[]
}

const PostDetailClient = ({
  cookie,
  location,
  images,
  title,
  nickname,
  createdAt,
  content,
  viewCount,
  heartCount,
  contentType,
  comments,
}: IPostDetail) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const pathName = usePathname()

  // 댓글 생성 hooks
  const { postBoardComment, comment, handleOnChange } =
    useBoardCommentMutation()

  const handleOnCommentSubmit = useRef(
    debounce(async (comment: string, boardId: string) => {
      postBoardComment.mutate({
        content: comment,
        boardId: boardId,
        parentCommentId: null,
      })
    }, 300)
  ).current

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      const boardId = pathName.split('/')[2]
      console.log('boardId', boardId)
      await handleOnCommentSubmit(comment, boardId)
    }
  }

  // 계속된 조회수 증가를 막기 위한 쿠키 저장
  useEffect(() => {
    const viewCookie = async () => {
      if (cookie) await setBoardCookieAction(cookie)
    }

    viewCookie()
  }, [cookie])

  // 지도 렌더링
  useEffect(() => {
    const { naver } = window
    if (mapRef.current && naver && location) {
      const center = new naver.maps.LatLng(
        location.coordinates[0],
        location.coordinates[1]
      )
      const map = new naver.maps.Map(mapRef.current, {
        center: center,
        zoom: 7,
      })

      // 마커 생성
      new naver.maps.Marker({
        position: center,
        map: map,
        title: location.point,
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
  }, [location])

  return (
    <div className='col-span-1 md:col-span-5'>
      {/*작성자 및 작성시각*/}
      <div className='border-b border-gray-200 px-4 py-2'>
        <h1 className='text-2xl text-gray-800'>{title}</h1>
        <div className='flex items-center justify-between gap-2 mt-4 text-sm text-gray-400'>
          <p className='font-medium text-xs'>
            {typeItems.find((v) => v.value === contentType)?.text}
          </p>
          <div className='flex items-center gap-2 text-xs'>
            <span>{nickname}</span>
            <span>|</span>
            <span>
              {timeAgo(dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'))}
            </span>
          </div>
        </div>
      </div>

      {/*내용 및 이미지*/}
      <div className='flex flex-col gap-4 p-4 w-full'>
        <div className='flex flex-col gap-4 min-h-32'>
          <span className='text-sm whitespace-pre-wrap'>{content}</span>
          {images.length > 0 &&
            images.map((image, index) => (
              <div className='w-full' key={index}>
                <Image
                  src={image}
                  alt='image'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='w-full h-auto object-contain'
                  placeholder='blur'
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
                />
              </div>
            ))}
        </div>

        {/*위치 (지도) */}
        {location?.point && (
          <div className='flex flex-col gap-3'>
            <span className='text-xs'>위치</span>
            <div className='w-full h-48'>
              <div ref={mapRef} className='w-full h-full rounded-lg border' />
            </div>
          </div>
        )}

        {/*조회수 및 좋아요수 */}
        <dl className='flex justify-end border-b border-gray-200 px-4 py-2 gap-2 mt-4 text-xs text-gray-400'>
          <dt>조회 {viewCount?.toLocaleString()}</dt>
          <span>·</span>
          <dt>좋아요 {heartCount?.toLocaleString()}</dt>
        </dl>
      </div>

      {/*댓글*/}
      <div className='w-full px-4 mb-16 space-y-4'>
        <div className={'flex space-x-2 items-center text-base pl-2'}>
          <span className={'text-gray-700'}>댓글</span>
          <span className={'text-green-400 md:font-semibold'}>
            {comments?.length || 0}
          </span>
        </div>

        {/*댓글 입력*/}
        <div className={'relative'}>
          <Input
            id={'comments'}
            label={''}
            direction={'row'}
            placeholder={'댓글을 입력해주세요.'}
            value={comment}
            onChange={(e) => handleOnChange(e)}
            onKeyDown={(e) => (e.code === 'Enter' ? handleKeyDown(e) : null)}
          />
          <span
            className={'text-gray-400 absolute right-5 top-[0.6rem] text-sm'}
          >
            입력
          </span>
        </div>

        {/*댓글 리스트*/}
        <div className={'flex flex-col space-y-6 pl-2'}>
          {comments?.length > 0 &&
            comments?.map((v) => (
              <div key={v._id} className={'flex flex-col space-y-1'}>
                <span className={'text-xs text-gray-500'}>센</span>
                <span className={'text-gray-800 text-sm'}>{v.content}</span>
                <div
                  className={'flex items-center gap-1 text-xs text-gray-500'}
                >
                  <span>
                    {timeAgo(dayjs(v.createdAt).format('YYYY-MM-DD HH:mm:ss'))}
                  </span>
                  <span>ᐧ</span>
                  <button>답글 달기</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default PostDetailClient
