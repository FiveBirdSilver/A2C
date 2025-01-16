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
      const response = await instance.get(`${endpoint}`, {
        withCredentials: true,
      })

      if (response.status === 302) {
        if (location) {
          window.location.href = '/login'
        }
        throw new Error('Redirection required')
      }

      return response.data
    },
    enabled: enabled,
  })
}
