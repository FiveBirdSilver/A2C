'use client'

import dayjs from 'dayjs'
import axios from 'axios'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { MdLocationPin } from 'react-icons/md'
import { IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'
import { AiOutlineEye } from 'react-icons/ai'

import timeAgo from '@/libs/utils/timeAgo.ts'
import NoResult from '@/components/common/NoResult'
import { IPostList } from '@/types'


const PostListClient = ({
  initialData,
  type,
}: {
  initialData: IPostList[]
  type: string
}) => {
  const { ref, inView } = useInView({ threshold: 0.5 }) // 좀 더 안정적인 threshold 값

  // 게시글 무한 스크롤 조회
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['getBoard', type],
    queryFn: async ({ pageParam = 1 }) => {
      // 첫 페이지는 이미 서버에서 가져왔으므로 스킵
      if (pageParam === 1) return { data: initialData }

      const response = await axios.get(
        `/backend/node/api/board?page=${pageParam}&contentType=${type}`,
        {
          withCredentials: true,
        }
      )
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.length > 0 ? allPages.length + 1 : undefined
    },
    initialData: {
      pages: [{ data: initialData }],
      pageParams: [1],
    },
  })

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [inView, fetchNextPage, hasNextPage, initialData])

  const allBoards = data?.pages.flatMap((page) => page.data) ?? []

  return (
    <>
      {allBoards.length === 0 ? (
        <NoResult />
      ) : (
        allBoards?.map((board: IPostList) => (
          <Link
            key={board._id}
            href={`/board/${board.contentType}/${board._id}`}
            className='border border-gray-50 bg-white md:rounded-xl shadow-gray-50 md:shadow cursor-pointer h-full'
          >
            <div className='text-gray-900 rounded-lg w-full md:p-4 md:space-y-4'>
              {/*제목 내용*/}
              <div className='p-4 md:px-2 md:p-0 space-y-4'>
                <div className='flex justify-between min-h-20 gap-2'>
                  <div className={'flex flex-col space-y-2'}>
                    <h4>{board.title}</h4>
                    <p className='w-full text-gray-400 text-sm  line-clamp-2'>
                      {board.content}
                    </p>
                  </div>
                  {board.images.length > 0 && (
                    <div className='min-w-20 h-20 md:h-20 object-cover relative'>
                      <Image
                        src={board.images[0]}
                        alt={'image'}
                        priority
                        fill
                        objectFit='contains'
                        className={'rounded-lg'}
                        placeholder={'blur'}
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=='
                      />
                    </div>
                  )}
                </div>
                {/*작성자 작성시간*/}
                <div className='flex items-center text-xs justify-between'>
                  <div className='flex items-center text-xs text-gray-400 space-x-1'>
                    <span className='text-gray-400 text-xs'>
                      {board.author.nickname}
                    </span>
                    <span>·</span>
                    <span className='text-gray-400 text-xs'>
                      {timeAgo(
                        dayjs(board.createdAt).format('YYYY-MM-DD HH:mm:ss')
                      )}
                    </span>
                  </div>

                  {/*조회수 좋아요수 댓글수*/}
                  <div className='flex items-center space-x-3'>
                    <div className='flex items-center space-x-1 text-xs text-gray-400'>
                      <AiOutlineEye />
                      <span>{board.viewCount}</span>
                    </div>
                    <div className='flex items-center space-x-1 text-xs text-gray-400'>
                      <IoHeartOutline />
                      <span>{board.heartCount}</span>
                    </div>
                    <div className='flex items-center space-x-1 text-xs text-gray-400'>
                      <IoChatbubbleOutline />
                      <span>{board.commentCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              {board.location?.point !== '' && (
                <div className='flex items-center justify-end  rounded-none px-4 py-3 md:bg-gray-50 border-t border-gray-100 md:border-none md:rounded-lg'>
                  <div className={'flex items-center gap-1'}>
                    <MdLocationPin className='text-green-400' />
                    <span className='text-green-400 text-xs'>
                      {board.location?.point ?? '위치 정보 없음'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))
      )}
      {/* 감지되는 div */}
      <div ref={ref} className='p-0.5' />
    </>
  )
}
export default PostListClient
