import { useQuery } from '@tanstack/react-query'
import instance from '@/libs/apis/instance.ts'
import { AxiosError } from 'axios'
import { notify } from '@/libs/utils/notify.ts'

interface IUseQuery {
  endpoint: string
  queryKey: string
}

export const useQueries = (props: IUseQuery) => {
  const { endpoint, queryKey } = props
  console.log(endpoint)
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      try {
        const response = await instance.get(endpoint)
        return response.data
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status
          switch (status) {
            case 401:
              notify(
                `세션이 만료되었거나 권한이 없습니다. \n다시 로그인 후 이용해주세요.`
              )
              break

            default:
              notify(
                `일시적인 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.`
              )
          }
        }
      }
    },
    staleTime: 10000,
  })
}
