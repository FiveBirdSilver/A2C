import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance.ts'

export const useBoardSocialMutation = () => {
  const router = useRouter()
  // 게시글 좋아요 API
  const postBoardLike = useMutation({
    mutationFn: async (board: { id: string; isLiked: boolean }) => {
      return await instance.post('/node/api/board/like', {
        isLiked: board.isLiked,
        boardId: board.id,
      })
    },
    onSuccess: () => {
      router.refresh()
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status
      toast.dismiss()
      if (status === 401) router.push('/login')
      else toast.error('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  return { postBoardLike }
}
