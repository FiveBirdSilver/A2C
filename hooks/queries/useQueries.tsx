import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

interface QueryConfig {
  endpoint: string
  queryKey: string
  enabled?: boolean
  gcTime?: number
}

export function useQueries<TData>({
  endpoint,
  queryKey,
  enabled,
  gcTime,
}: QueryConfig) {
  return useQuery<TData, AxiosError>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(`/backend${endpoint}`, {
        withCredentials: true,
      })
      return response.data
    },
    enabled: enabled,
    gcTime: gcTime,
  })
}
