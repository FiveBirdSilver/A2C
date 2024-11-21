import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import instance from '@/app/libs/apis/instance.ts'
import { notify } from '@/libs/utils/notify.ts'

interface LoginType {
  email: string
  password: string
}

const fetchData = async (data: LoginType) => {
  return await instance.post('/user/login', data)
}

// test@test.com, gp7181811
export const useLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: LoginType) => {
      return fetchData(data)
    },
    onSuccess: (response) => {
      router.push('/')
      return response
    },
    onError: (error: AxiosError) => {
      console.error(error)
      notify('아이디나 비밀번호가 일치하지 않습니다.') // 상태코드 반환 안됌 확인 필요
    },
  })
}
