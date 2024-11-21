import { useMutation } from '@tanstack/react-query'
import instance from '@/app/libs/apis/instance.ts'
import { AxiosError } from 'axios'

interface VerifySendType {
  email: string
}

const fetchData = async (data: VerifySendType) => {
  return await instance.post('/user/verifySend', data)
}

export const useVerifySend = () => {
  return useMutation({
    mutationFn: async (data: VerifySendType) => {
      return fetchData(data)
    },
    onSuccess: (res) => {
      console.log(res)
      return res
    },
    onError: (err: AxiosError) => {
      console.log(err.response) // 상태코드 반환 안됌 확인 필요
      return err
    },
  })
}
