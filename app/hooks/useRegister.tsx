import { useMutation } from '@tanstack/react-query'
import instance from '@/app/libs/apis/instance.ts'
import { AxiosError } from 'axios'

interface RegisterType {
  email: string
  password: string
  confirmPassword?: string
  nickname: string
}

const fetchData = async (data: RegisterType) => {
  return await instance.post('/user/signup', data)
}

// test@test.com, gp7181811

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterType) => {
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
