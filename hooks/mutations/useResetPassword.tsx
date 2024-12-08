import { useMutation } from '@tanstack/react-query'
import instance from '@/libs/apis/instance.ts'
import { useState } from 'react'

interface IFindAccount {
  email: string
}

export const useResetPassword = () => {
  const [isSending, setIsSending] = useState<boolean>(false)
  const sendEmail = useMutation({
    mutationFn: async (data: IFindAccount) => {
      return await instance.post('/user/forget', data)
    },
    onSuccess: () => {
      alert('인증번호가 발송되었습니다.')
      setIsSending(true)
    },
    onError: () => {
      alert('유효하지 않은 이메일 주소입니다.')
    },
  })

  return { sendEmail, isSending }
}
