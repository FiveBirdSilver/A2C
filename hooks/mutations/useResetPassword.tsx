import { router } from 'next/client'
import { useMutation } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance.ts'

interface IFindAccount {
  email: string
}

export const useResetPassword = () => {
  const postSendEmail = useMutation({
    mutationFn: async (data: IFindAccount) => {
      return await instance.post('/user/forget', data)
    },
    onSuccess: () => {
      alert('비밀번호 변경이 가능한 링크가 이메일로 전송되었습니다.')
      router.push('/')
    },
    onError: () => {
      alert('유효하지 않은 이메일 주소입니다.')
    },
  })

  return { postSendEmail }
}
