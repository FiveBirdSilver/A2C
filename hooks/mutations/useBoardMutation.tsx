import { useMutation } from '@tanstack/react-query'
import instance from '@/libs/apis/instance.ts'

interface IBoard {
  title: string
  content: string
  location: string
  price: string | number
}

export const useBoardMutation = () => {
  const postBoard = useMutation({
    mutationFn: async (data: IBoard) => {
      return await instance.post('/user/board', data)
    },
    onSuccess: () => {
      // alert('인증번호가 발송되었습니다.')
    },
    onError: () => {
      // alert('유효하지 않은 이메일 주소입니다.')
    },
  })

  return { postBoard }
}
