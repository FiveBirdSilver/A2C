'use client'

import axios from 'axios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance'

interface IAccount {
  result: string
  data: {
    _id: string
    email: string
    nickname: string
  }
}

const getCheckAccount = async (): Promise<IAccount | null> => {
  try {
    const response = await instance.get<IAccount>('/node/api/user/account')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null
    } else {
      console.error('Failed to check account status:', error)
      throw error
    }
  }
}

export const useAccountQuery = (
  options?: Omit<
    UseQueryOptions<IAccount | null, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<IAccount | null, Error>({
    queryKey: ['account'],
    queryFn: getCheckAccount,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    ...options,
  })
}
