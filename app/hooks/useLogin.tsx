import { useMutation } from '@tanstack/react-query'
import instance from '@/lib/instance.ts'
import { AxiosError } from 'axios'
//
interface LoginResponse {
  email: string
  password: string
}
//
const login = async (data: LoginResponse) => {
  return await instance.post('/user/login', data)
}
//
// test@test.com, gp7181811

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginResponse) => {
      return login(data)
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
