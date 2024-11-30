import { useQuery } from '@tanstack/react-query'
import instance from '@/libs/apis/instance.ts'

export const useFetch = (coordinate: string) => {
  return useQuery({
    queryKey: [coordinate],
    queryFn: async () => {
      const response = await instance.post('/user/forget')
      return response.data
    },
  })
}
