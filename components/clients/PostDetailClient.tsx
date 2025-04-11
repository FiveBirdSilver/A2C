'use client'

import { KeyboardEvent, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import debounce from 'lodash/debounce'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { IPostDetail } from '@/types'
import { setBoardCookieAction } from '@/app/actions/setBoardCookieAction'
import Input from '@/components/ui/Input'
import typeItems from '@/constants/boardTypeItems.json'
import { useBoardCommentMutation } from '@/hooks/mutations/useBoardCommentMutation'
import timeAgo from '@/libs/utils/timeAgo'

// PostHeader: 제목, 작성자, 작성 시간 등
const PostHeader = ({
  title,
  contentType,
  author,
  createdAt,
}: IPostDetail['data']) => (
  <div className='border-b border-gray-200 px-4 py-2'>
    <h1 className='text-2xl text-gray-800'>{title}</h1>
    <div className='mt-4 flex items-center justify-between gap-2 text-sm text-gray-400'>
      <p className='text-xs font-medium'>
        {typeItems.find((v) => v.value === contentType)?.text}
      </p>
      <div className='flex items-center gap-2 text-xs'>
        <span>{author.nickname}</span>
        <span>|</span>
        <span>{timeAgo(dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss'))}</span>
      </div>
    </div>
  </div>
)

// PostContent: 이미지, 내용, 지도, 조회수 등
const PostContent = ({
  images,
  content,
  location,
  viewCount,
  heartCount,
}: IPostDetail['data']) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { naver } = window
    if (mapRef.current && naver && location) {
      const center = new naver.maps.LatLng(
        location.coordinates[0],
        location.coordinates[1]
      )
      const map = new naver.maps.Map(mapRef.current, {
        center,
        zoom: 7,
      })
      new naver.maps.Marker({
        position: center,
        map,
        title: location.point,
        icon: {
          content: `
            <div style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
              <svg width="30" height="30" fill="#0080ff" viewBox="-39.57 -39.57 474.85 474.85" xmlns="http://www.w3.org/2000/svg">
                <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
              </svg>
            </div>`,
        },
      })
      const bounds = new naver.maps.LatLngBounds(center, center).extend(center)
      map.fitBounds(bounds)
    }
  }, [location])

  return (
    <div className='flex w-full flex-col gap-4 p-4'>
      <div className='flex min-h-32 flex-col gap-4'>
        <span className='whitespace-pre-wrap text-sm'>{content}</span>
        {images.map((image, index) => (
          <div className='w-full' key={index}>
            <Image
              src={image}
              alt={`post-image-${index}`}
              width={0}
              height={0}
              sizes='100vw'
              className='h-auto w-full object-contain'
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
            />
          </div>
        ))}
      </div>
      {location?.point && (
        <div className='flex flex-col gap-3'>
          <span className='text-xs'>위치</span>
          <div className='h-48 w-full'>
            <div ref={mapRef} className='h-full w-full rounded-lg border' />
          </div>
        </div>
      )}
      <dl className='mt-4 flex justify-end gap-2 border-b border-gray-200 px-4 py-2 text-xs text-gray-400'>
        <dt>조회 {viewCount.toLocaleString()}</dt>
        <span>·</span>
        <dt>좋아요 {heartCount.toLocaleString()}</dt>
      </dl>
    </div>
  )
}

// Comments: 댓글 입력 및 리스트
const Comments = ({
  comments,
  boardId,
}: {
  comments: IPostDetail['data']['comments']
  boardId: string
}) => {
  const { postBoardComment, comment, handleOnChange } =
    useBoardCommentMutation()

  const handleOnCommentSubmit = useRef(
    debounce(async (comment: string, boardId: string) => {
      postBoardComment.mutate({
        content: comment,
        boardId,
        parentCommentId: null,
      })
    }, 300)
  ).current

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      await handleOnCommentSubmit(comment, boardId)
    }
  }

  return (
    <div className='mb-16 w-full space-y-4 px-4'>
      <div className='flex items-center space-x-2 pl-2 text-base'>
        <span className='text-gray-700'>댓글</span>
        <span className='text-green-400 md:font-semibold'>
          {comments.length}
        </span>
      </div>
      <div className='relative'>
        <Input
          id='comments'
          label=''
          direction='row'
          placeholder='댓글을 입력해주세요.'
          value={comment}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <span className='absolute right-5 top-[0.6rem] text-sm text-gray-400'>
          입력
        </span>
      </div>
      <div className='flex flex-col space-y-6 pl-2'>
        {comments.map((v) => (
          <div key={v._id} className='flex flex-col space-y-1'>
            <span className='text-xs text-gray-500'>{v.author.nickname}</span>
            <span className='text-sm text-gray-800'>{v.content}</span>
            <div className='flex items-center gap-1 text-xs text-gray-500'>
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
  )
}

// 메인 컴포넌트
const PostDetailClient = ({ cookie, data }: IPostDetail) => {
  const pathName = usePathname()
  const boardId = pathName.split('/')[2]

  useEffect(() => {
    const viewCookie = async () => {
      if (cookie) await setBoardCookieAction(cookie)
    }
    viewCookie()
  }, [cookie])

  return (
    <div className='col-span-1 md:col-span-5'>
      <PostHeader {...data} />
      <PostContent {...data} />
      <Comments comments={data.comments} boardId={boardId} />
    </div>
  )
}

export default PostDetailClient
