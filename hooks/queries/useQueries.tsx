import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

// import { instance } from '@/libs/apis/instance.ts'

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
      const response = await axios.get(`/api${endpoint}`, {
        withCredentials: true,
      })
      return response.data
    },
    enabled: enabled,
  })
}
