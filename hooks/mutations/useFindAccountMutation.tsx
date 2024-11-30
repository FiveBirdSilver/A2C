import { useMutation } from '@tanstack/react-query'
import instance from '@/libs/apis/instance.ts'

interface IFindAccount {
  email: string
}

export const useFindAccountMutation = () => {
  return useMutation({
    mutationFn: async (data: IFindAccount) => {
      return await instance.post('/user/forget', data)
    },
    onSuccess: () => {
      alert('인증번호가 발송되었습니다.')
    },
    onError: () => {
      alert('유효하지 않은 이메일 주소입니다.')
    },
  })
}
