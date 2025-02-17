import { ChangeEvent, useCallback, useState } from 'react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance.ts'
import { toastError } from '@/libs/utils/toast.ts'

export const useBoardCommentMutation = () => {
  const router = useRouter()
  const [comment, setComment] = useState<string>('')

  const postBoardComment = useMutation({
    mutationFn: async (board: {
      content: string
      boardId: string
      parentCommentId: string | null
    }) => {
      return await instance.post('/node/api/comment', board)
    },
    onSuccess: () => {
      router.refresh()
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status
      if (status === 401) router.push('/login')
      else toastError('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  // 체인지 이벤트 핸들러
  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }, [])

  return { postBoardComment, comment, handleOnChange }
}
