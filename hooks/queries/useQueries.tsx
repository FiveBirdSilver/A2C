import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { apiFetcher } from '@/libs/apis/instance.ts'

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
      const response = await apiFetcher.get(`${endpoint}`, {
        withCredentials: true,
      })
      return response.data
    },
    enabled: enabled,
  })
}
