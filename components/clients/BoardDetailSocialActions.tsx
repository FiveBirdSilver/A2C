'use client'

import { IoMdHeartEmpty } from 'react-icons/io'
import { IoChatbubblesOutline, IoShareSocial } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'

import { useBoardSocialMutation } from '@/hooks/mutations/useBoardSocialMutation.tsx'

// 공유하기 버튼 이벤트 => 도메인 복사
const CopyURL = () => {
  const location = window.location.href
  const url = `a2climbing.com/board${location.split('/board')[1]}`

  navigator.clipboard
    .writeText(url)
    .then(() => {
      toast.dismiss()
      toast.success('클립보드에 복사되었습니다.')
    })
    .catch(() => {
      toast.error('잠시 후 다시 시도해주세요.')
    })
}

const BoardDetailSocialActions = ({
  heartCount,
  chatCount,
}: {
  heartCount: number
  chatCount: number
}) => {
  const { postBoardLike } = useBoardSocialMutation()
  const pathName = usePathname()

  return (
    <aside className='hidden md:block md:col-span-1 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto py-6'>
      <div className='flex flex-col items-center space-y-6'>
        <div className='flex flex-col space-y-2 items-center justify-center'>
          <button
            onClick={() =>
              postBoardLike.mutate({ id: pathName.split('detail/')[1] })
            }
            className='rounded-full border border-gray-200 shadow-[0_2px_14px_rgba(0,0,0,0.12)] w-12 h-12 flex items-center justify-center text-lg text-gray-700'
          >
            <IoMdHeartEmpty />
          </button>
          <span className='text-gray-700 text-xs'>
            {heartCount.toLocaleString()}
          </span>
        </div>
        <div className='flex flex-col space-y-2 items-center justify-center'>
          <button className='rounded-full border border-gray-200 shadow-[0_2px_14px_rgba(0,0,0,0.12)] w-12 h-12 flex items-center justify-center text-lg text-gray-700'>
            <IoChatbubblesOutline />
          </button>
          <span className='text-gray-700 text-xs'>
            {chatCount.toLocaleString()}
          </span>
        </div>
        <button
          onClick={() => CopyURL()}
          className='rounded-full border border-gray-200 shadow-[0_2px_14px_rgba(0,0,0,0.12)] w-12 h-12 flex items-center justify-center text-lg text-gray-700'
        >
          <IoShareSocial />
        </button>
      </div>
    </aside>
  )
}
export default BoardDetailSocialActions
