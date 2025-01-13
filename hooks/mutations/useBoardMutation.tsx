import { useMutation } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance.ts'

interface IBoard {
  title: string
  content: string
  location: string
  price: string | number
}

export const useBoardMutation = () => {
  const postBoard = useMutation({
    mutationFn: async (data: IBoard) => {
      return await instance.post('/node/api/board', data)
    },
    onSuccess: () => {},
    onError: () => {},
  })

  return { postBoard }
}
