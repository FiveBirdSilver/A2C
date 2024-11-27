import { useMutation } from '@tanstack/react-query'
import instance from '@/app/libs/apis/instance.ts'
import { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'
import { notify } from '@/libs/utils/notify.ts'

interface VerifySendType {
  email: string
}

interface VerifyCheckType {
  email: string
  authNum: string
}

const useVerifyMutation = () => {
  const [authCode, setAuthCode] = useState<string>('')
  const [openCodeBox, setOpenCodeBox] = useState<boolean>(false)

  // 인증번호 발송
  const sendCode = useMutation({
    mutationKey: ['sendCode'],
    mutationFn: async (data: VerifySendType) => {
      return await instance.post('/user/verifySend', data)
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

  // 인증번호 체크
  const checkCode = useMutation({
    mutationKey: ['checkCode'],
    mutationFn: async (data: VerifyCheckType) => {
      return await instance.get(
        `/user/verifyCheck?email=${data.email}&code=${data.authNum}`
      )
    },
    onSuccess: () => {
      notify('인증이 성공적으로 완료되었습니다.')
      setOpenCodeBox(false)
    },
    onError: (err: AxiosError) => {
      console.log(err.response)
      notify('인증에 실패했습니다. 다시 시도해주세요.')
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
