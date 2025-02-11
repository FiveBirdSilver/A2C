import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/libs/apis/instance.ts'

interface IBoard {
  title: string
  content: string
  location: string
  price: string | number
}

export const useBoardWriteMutation = () => {
  const postBoard = useMutation({
    mutationFn: async (data: IBoard) => {
      return await apiClient.post('/node/api/board', data)
    },
    onSuccess: () => {},
    onError: () => {},
  })

  return { postBoard }
}
