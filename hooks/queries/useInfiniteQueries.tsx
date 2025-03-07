import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

interface IUseInfiniteQuery {
  queryKey: string
}

export const useInfiniteQueries = (props: IUseInfiniteQuery) => {
  const { queryKey } = props

  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 6 }) => {
      const response = await axios.get(
        `/backend${queryKey}?page=${pageParam}`,
        {
          withCredentials: true,
        }
      )
      return response.data.data
    },
    initialPageParam: 5,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1
    },
  })
}
