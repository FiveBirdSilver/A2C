import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance.ts'

interface QueryConfig {
  endpoint: string
  queryKey: string
  enabled?: boolean
}

export function useQueries<TData>({
  endpoint,
  queryKey,
  enabled,
}: QueryConfig) {
  return useQuery<TData, AxiosError>({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await instance.get(`${endpoint}`, {
          withCredentials: true,
        })
        return response.data
      } catch (error) {
        console.log('error', error)
      }
    },
    enabled: enabled,
  })
}
