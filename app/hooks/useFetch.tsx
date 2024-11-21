import { useQuery } from '@tanstack/react-query'
import instance from '@/app/libs/apis/instance.ts'

const fetchData = async (param: string) => {
  return await instance.get(`/GetClimbInfo?${param}`)
}

export const useFetch = (coordinate: string) => {
  return useQuery({
    queryKey: [coordinate],
    queryFn: async () => {
      return fetchData(coordinate)
    },
  })
}
