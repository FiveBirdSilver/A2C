import { useMutation } from '@tanstack/react-query'
import instance from '@/app/apis/instance.ts'
import { AxiosError } from 'axios'

interface VerifyCheckType {
  email: string
  authNum: string
}

const fetchData = async (data: VerifyCheckType) => {
  console.log(data)
  return await instance.get(
    `/user/verifyCheck?email=${data.email}&code=${data.authNum}`
  )
}

export const useVerifyCheck = () => {
  return useMutation({
    mutationFn: async (data: VerifyCheckType) => {
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
