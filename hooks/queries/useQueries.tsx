import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useQueries = (coordinate: string) => {
  return useQuery({
    queryKey: [coordinate],
    queryFn: async () => {
      const response = await axios.get(
        `http://34.64.197.167:9001/api/map/GetClimbPlaceInfo?${coordinate}`
      )
      return response.data
    },
  })
}
