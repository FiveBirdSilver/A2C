'use client'
import { ReactNode } from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { IoChatbubblesOutline, IoShareSocial, IoHeart } from 'react-icons/io5'
import { motion } from 'framer-motion'

import { useBoardSocialMutation } from '@/hooks/mutations/useBoardSocialMutation.tsx'
import { toastError, toastSuccess } from '@/libs/utils/toast.ts'
import { usePathname } from 'next/navigation'

interface AnimatedIconButtonProps {
  onClick: () => void
  icon: ReactNode
  isActive?: boolean
  count?: number
  className?: string
}

const AnimatedIconButton = ({
  isActive = false,
  onClick,
  icon,
  count,
  className = '',
  ...props
}: AnimatedIconButtonProps) => {
  return (
    <div className='flex flex-row md:flex-col md:space-y-2 items-center justify-center'>
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 1.2 }} // 버튼 탭했을 때 1.2배 커짐
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`rounded-full md:border md:border-gray-200 md:shadow-[0_2px_14px_rgba(0,0,0,0.12)] w-8 md:w-12 h-12 flex items-center justify-center text-lg text-gray-700 ${className}`}
        {...props}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </motion.button>
      <p className={`${isActive ? 'text-green-400' : 'text-gray-700'} text-sm`}>
        {count}
      </p>
    </div>
  )
}

// 공유하기 버튼 이벤트 => 도메인 복사
const CopyURL = (pathName: string) => {
  const url = `a2climbing.com/${pathName}`

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
  id,
  heartCount,
  chatCount,
  isLiked,
}: {
  id: string
  heartCount: number
  chatCount: number
  isLiked: boolean
}) => {
  const pathName = usePathname()
  const { postBoardLike } = useBoardSocialMutation()

  return (
    <div className='contents md:block md:col-span-1 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-6'>
      <div className='fixed px-8 pb-3 md:pb-0 md:px-0 md:relative bottom-0 flex flex-row md:flex-col items-baseline w-full justify-between md:items-center md:space-y-6 bg-white z-[100] min-h-12'>
        {/*좋아요 수*/}
        <AnimatedIconButton
          icon={
            isLiked ? (
              <IoHeart className={'text-green-400 font-bold'} />
            ) : (
              <IoMdHeartEmpty className={'font-bold'} />
            )
          }
          onClick={() =>
            postBoardLike.mutate({
              id: id,
              isLiked: isLiked,
            })
          }
          count={heartCount}
          isActive={isLiked}
        />

        {/*댓글 수*/}
        <AnimatedIconButton
          icon={<IoChatbubblesOutline className={'font-bold'} />}
          onClick={() => {}}
          count={chatCount}
          isActive={isLiked}
        />

        {/*공유하기*/}
        <AnimatedIconButton
          icon={<IoShareSocial className={'font-bold'} />}
          onClick={() => CopyURL(pathName)}
        />
      </div>
    </div>
  )
}
export default BoardDetailSocialClient
