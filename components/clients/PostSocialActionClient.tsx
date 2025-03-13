'use client'

import { IoMdHeartEmpty } from 'react-icons/io'
import { IoChatbubblesOutline, IoShareSocial, IoHeart } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { useBoardSocialMutation } from '@/hooks/mutations/useBoardSocialMutation.tsx'
import { toastError, toastSuccess } from '@/libs/utils/toast.ts'

// 공유하기 버튼 이벤트 => 도메인 복사
const CopyURL = () => {
  const location = window.location.href
  const url = `a2climbing.com/board${location.split('/life')[1]}`

  navigator.clipboard
    .writeText(url)
    .then(() => {
      toastSuccess('클립보드에 복사되었습니다.')
    })
    .catch(() => {
      toastError('잠시 후 다시 시도해주세요.')
    })
}

const BoardDetailSocialClient = ({
  heartCount,
  chatCount,
  isLiked,
}: {
  heartCount: number
  chatCount: number
  isLiked: boolean
}) => {
  const { postBoardLike } = useBoardSocialMutation()
  const pathName = usePathname()

  return (
    <div className='contents md:block md:col-span-1 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-6'>
      <div className='fixed px-8 pb-3 md:pb-0 md:px-0 md:relative bottom-0 flex flex-row md:flex-col items-baseline w-full justify-between md:items-center md:space-y-6 bg-white z-[100] min-h-12'>
        {/*좋아요 수*/}
        <div className='flex flex-row md:flex-col md:space-y-2 items-center justify-center'>
          <motion.button
            onClick={() =>
              postBoardLike.mutate({
                id: pathName.split('detail/')[1],
                isLiked: isLiked,
              })
            }
            className='rounded-full md:border md:border-gray-200 md:shadow-[0_2px_14px_rgba(0,0,0,0.12)] w-8 md:w-12 h-12 flex items-center justify-center text-lg text-gray-700'
            whileTap={{ scale: 1.2 }} // 버튼 탭했을 때 1.2배 커짐
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isLiked ? (
                <IoHeart className={'text-green-400 font-bold'} />
              ) : (
                <IoMdHeartEmpty className={'font-bold'} />
              )}
            </motion.div>
          </motion.button>
          <p
            className={`${isLiked ? 'text-green-400' : 'text-gray-700'} text-sm`}
          >
            {heartCount.toLocaleString()}
          </p>
        </div>

        {/*댓글 수*/}
        <div className='flex flex-row md:flex-col md:space-y-2 items-center justify-center'>
          <button className='rounded-full md:border md:border-gray-200 md:shadow-[0_2px_14px_rgba(0,0,0,0.12)] w-8 md:w-12 h-12 flex items-center justify-center text-lg text-gray-700'>
            <IoChatbubblesOutline className={'font-bold'} />
          </button>
          <p className='text-gray-700 text-sm'>{chatCount.toLocaleString()}</p>
        </div>

        {/*공유하기*/}
        <div className='flex flex-row md:flex-col md:space-y-2 items-center justify-center'>
          <button
            onClick={() => CopyURL()}
            className='rounded-full md:border md:border-gray-200 md:shadow-[0_2px_14px_rgba(0,0,0,0.12)] md:w-12 h-12 flex items-center justify-center text-lg text-gray-700'
          >
            <IoShareSocial className={'font-bold'} />
          </button>
          <p className='text-gray-700 text-sm min-w-4 text-start'></p>
        </div>
      </div>
    </div>
  )
}
export default BoardDetailSocialClient
