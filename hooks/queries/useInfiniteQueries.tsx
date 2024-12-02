import { useInfiniteQuery } from '@tanstack/react-query'
import instance from '@/libs/apis/instance.ts'

interface IUseInfiniteQuery {
  queryKey: string
}

export const useInfiniteQueries = (props: IUseInfiniteQuery) => {
  const { queryKey } = props

  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 2 }) => {
      const response = await instance.get(`${queryKey}?page=${pageParam}`)
      return response.data.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1
    },
    select: (data) => ({
      pages: data.pages[0].flatMap((page: object[]) => page),
      pageParams: data.pageParams,
    }),
  })
}
