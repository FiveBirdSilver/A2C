import { AxiosError } from 'axios'

import { useMutation } from '@tanstack/react-query'
import instance from '@/app/libs/apis/instance.ts'
import { notify } from '@/libs/utils/notify.ts'

interface FindAccountType {
  email: string
}

const fetchData = async (data: FindAccountType) => {
  return await instance.post('/user/forget', data)
}

// test@test.com, gp7181811
export const useFindAccount = () => {
  return useMutation({
    mutationFn: async (data: FindAccountType) => {
      return fetchData(data)
    },
    onSuccess: (response) => {
      // router.push('/')
      console.log(response)
      notify('유효하지 않은 이메일 주소입니다.')
    },
    onError: (error: AxiosError) => {
      console.error(error)
      notify('유효하지 않은 이메일 주소입니다.')
    },
  })
}
