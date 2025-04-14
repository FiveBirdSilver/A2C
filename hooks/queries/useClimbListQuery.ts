'use client'

import axios from 'axios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance'
import { IMapList } from '@/types'

const getClimbList = async (param: string): Promise<IMapList[] | null> => {
  try {
    const response = await instance.get<IMapList[]>(
      `/python/api/map/GetClimbPlaceList?my_lat=${param}`
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch data')
    }
    throw error
  }
}

export const useClimbListQuery = (
  param: string,
  options?: Omit<
    UseQueryOptions<IMapList[] | null, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<IMapList[] | null, Error>({
    queryKey: ['climbList'],
    queryFn: () => getClimbList(param),
    retry: 3,
    ...options,
  })
}
