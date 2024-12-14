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
  // 인증번호 코드
  const [authCode, setAuthCode] = useState<string>('')

  // 인증번호 폼 열림 state
  const [openAuthCodeBox, setOpenAuthCodeBox] = useState<boolean>(false)

  // 인증 유무
  const [isAuthCheck, setIsAuthCheck] = useState<boolean>(false)

  // 인증번호 발송
  const postSendCode = useMutation({
    mutationKey: ['sendCode'],
    mutationFn: async (data: IVerifySend) => {
      return await instance.post('/user/verifySend', data)
    },
    onSuccess: () => {
      alert('인증번호가 발송되었습니다.')
    },
    onError: (error: AxiosError) => {
      console.error(error)
      alert('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  // 인증번호 체크
  const postCheckCode = useMutation({
    mutationKey: ['checkCode'],
    mutationFn: async (data: IVerifyCheck) => {
      return await instance.get(
        `/user/verifyCheck?email=${data.email}&code=${data.authNum}`
      )
    },
    onSuccess: () => {
      alert('인증이 성공적으로 완료되었습니다.')
      setIsAuthCheck(true)
      setOpenAuthCodeBox(false)
    },
    onError: (error: AxiosError) => {
      console.error(error)
      alert('인증에 실패했습니다. 다시 시도해주세요.')
    },
  })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthCode(event.target.value)
  }

  return {
    postSendCode,
    postCheckCode,
    isAuthCheck,
    openAuthCodeBox,
    setOpenAuthCodeBox,
    authCode,
    handleOnChange,
  }
}
export default useVerifyMutation
