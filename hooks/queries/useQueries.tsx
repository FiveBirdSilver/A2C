import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

import { instance } from '@/libs/apis/instance.ts'
import { notify } from '@/libs/utils/notify.ts'
import { useRouter } from 'next/navigation'

interface QueryConfig {
  endpoint: string
  queryKey: string
}

export function useQueries<TData>({ endpoint, queryKey }: QueryConfig) {
  const router = useRouter()

  return useQuery<TData, AxiosError>({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await instance.get(`/${endpoint}`)
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          switch (status) {
            case 401:
              router.prefetch('/login')
              router.push('/login')
              break
            default:
              notify(
                `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
              )
          }
        }
      }
    },
  })
}
