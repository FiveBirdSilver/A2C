import { useInfiniteQuery } from '@tanstack/react-query'
import { apiFetcher } from '@/libs/apis/instance.ts'

interface IUseInfiniteQuery {
  queryKey: string
}

export const useInfiniteQueries = (props: IUseInfiniteQuery) => {
  const { queryKey } = props

  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 6 }) => {
      const response = await apiFetcher.get(`${queryKey}?page=${pageParam}`)
      return response.data.data
    },
    initialPageParam: 5,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1
    },
  })
}
