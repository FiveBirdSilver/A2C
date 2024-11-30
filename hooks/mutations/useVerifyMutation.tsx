import { ChangeEvent, useState } from 'react'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'

import instance from '@/libs/apis/instance.ts'

interface IVerifySend {
  email: string
}

interface IVerifyCheck {
  email: string
  authNum: string
}

const useVerifyMutation = () => {
  const [authCode, setAuthCode] = useState<string>('')
  const [openCodeBox, setOpenCodeBox] = useState<boolean>(false)

  // 인증번호 발송
  const sendCode = useMutation({
    mutationKey: ['sendCode'],
    mutationFn: async (data: IVerifySend) => {
      return await instance.post('/user/verifySend', data)
    },
    onSuccess: () => {
      alert('인증번호가 발송되었습니다.')
    },
    onError: (error: AxiosError) => {
      console.log(error)
      alert('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  // 인증번호 체크
  const checkCode = useMutation({
    mutationKey: ['checkCode'],
    mutationFn: async (data: IVerifyCheck) => {
      return await instance.get(
        `/user/verifyCheck?email=${data.email}&code=${data.authNum}`
      )
    },
    onSuccess: () => {
      alert('인증이 성공적으로 완료되었습니다.')
      setOpenCodeBox(false)
    },
    onError: (error: AxiosError) => {
      console.log(error.response)
      alert('인증에 실패했습니다. 다시 시도해주세요.')
    },
  })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthCode(event.target.value)
  }

  return {
    sendCode,
    checkCode,
    openCodeBox,
    setOpenCodeBox,
    authCode,
    handleOnChange,
  }
}
export default useVerifyMutation
