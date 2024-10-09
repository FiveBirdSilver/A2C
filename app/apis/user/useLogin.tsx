import { useMutation } from '@tanstack/react-query'
import instance from '@/app/apis/instance.ts'
import { AxiosError } from 'axios'

interface LoginType {
  email: string
  password: string
}

const fetchData = async (data: LoginType) => {
  return await instance.post('/user/login', data)
}

// test@test.com, gp7181811

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginType) => {
      return fetchData(data)
    },
    onSuccess: (res) => {
      return res
    },
    onError: (err: AxiosError) => {
      console.log(err.response) // 상태코드 반환 안됌 확인 필요
      return err
    },
  })
}
