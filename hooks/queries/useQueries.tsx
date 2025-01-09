import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

import { instance } from '@/libs/apis/instance.ts'
import { notify } from '@/libs/utils/notify.ts'

interface QueryConfig {
  endpoint: string
  queryKey: string
}

export function useQueries<TData>({ endpoint, queryKey }: QueryConfig) {
  return useQuery<TData, AxiosError>({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await instance.get(`/${endpoint}`)
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error)
          notify(`일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`)
        }
      }
    },
  })
}
