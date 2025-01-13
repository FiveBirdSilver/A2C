import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { instance } from '@/libs/apis/instance.ts'
import { notify } from '@/libs/utils/notify.ts'

interface IRegister {
  email: string
  password: string
  confirmPassword?: string
  nickname: string
  isAuthCheck: boolean
}

export const useRegisterMutation = () => {
  const router = useRouter()

  const postRegister = useMutation({
    mutationFn: async (data: IRegister) => {
      if (data.isAuthCheck) {
        notify('이메일 인증이 필요합니다. 인증을 완료해주세요.')
        return
      }
      return await instance.post('/node/api/user/signup', data)
    },
    onSuccess: (res) => {
      if (res?.data.result === 'fail_email') notify('이미 존재하는 계정입니다.')
      else router.push('/')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      notify('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  return { postRegister }
}
