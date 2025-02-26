import { ChangeEvent, MouseEvent, useState } from 'react'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'

import { instance } from '@/libs/apis/instance.ts'
import { toastError, toastSuccess } from '@/libs/utils/toast.ts'
import useTimer from '@/hooks/common/useTimer.tsx'

interface IVerifyCheck {
  email: string
  code: string
}

const useVerifyMutation = () => {
  // 인증번호 코드
  const [authCode, setAuthCode] = useState<string>('')

  // 인증번호 폼 열림 state
  const [openAuthCodeBox, setOpenAuthCodeBox] = useState<boolean>(false)

  // 인증 유무
  const [isAuthCheck, setIsAuthCheck] = useState<boolean>(false)

  // 3분(180초) 타이머
  const { timeLeft, startTimer, resetTimer } = useTimer(180)

  // 인증번호 발송
  const postSendCode = useMutation({
    mutationKey: ['sendCode'],
    mutationFn: async (data: { email: string }) => {
      return await instance.post('/node/api/user/verifySend', data)
    },
    onSuccess: () => {
      toastSuccess('인증번호가 발송되었습니다.')
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toastError('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  // 인증번호 체크
  const postVerifyCheck = useMutation({
    mutationKey: ['checkCode'],
    mutationFn: async (data: IVerifyCheck) => {
      return await instance.post(`/node/api/user/verifyCheck`, data)
    },
    onSuccess: () => {
      toastSuccess('인증이 성공적으로 완료되었습니다.')
      setIsAuthCheck(true)
      setOpenAuthCodeBox(false)
    },
    onError: (error: AxiosError) => {
      console.log(error)
      toastError('인증에 실패했습니다. 다시 시도해주세요.')
    },
  })

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthCode(event.target.value)
  }

  /**
   * 이메일 인증을 위한 인증번호 발송 함수
   * @param event preventDefault
   * @param email 인증번호 보내는 이메일
   * @param type 타이머 최초시작인지, 재시작인지
   */
  const handleOnSendCode = async (
    event: MouseEvent<HTMLButtonElement>,
    email: string,
    type: 'start' | 'reset'
  ) => {
    event.preventDefault()
    setOpenAuthCodeBox(true)
    postSendCode.mutate({ email: email })

    type === 'start' ? startTimer() : resetTimer()
  }

  /**
   * 발송한 인증번호와 일치하는지 확인
   * @param event preventDefault
   * @param email 인증번호 보낸 이메일
   */
  const confirmAuthNumber = async (
    event: MouseEvent<HTMLButtonElement>,
    email: string
  ) => {
    event.preventDefault()
    postVerifyCheck.mutate({
      email: email,
      code: authCode,
    })
  }

  return {
    postSendCode,
    postVerifyCheck,
    isAuthCheck,
    openAuthCodeBox,
    authCode,
    handleOnChange,
    handleOnSendCode,
    timeLeft,
    confirmAuthNumber,
  }
}
export default useVerifyMutation
