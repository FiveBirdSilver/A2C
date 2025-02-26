import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { instance } from '@/libs/apis/instance.ts'
import toast from 'react-hot-toast'
import { toastError } from '@/libs/utils/toast.ts'

interface IRegister {
  email: string
  password: string
  confirmPassword?: string
  nickname: string
}

export const useRegisterMutation = () => {
  const router = useRouter()

  const postRegister = useMutation({
    mutationFn: async ({
      isAuthCheck,
      data,
    }: {
      isAuthCheck: boolean
      data: IRegister
    }) => {
      if (!isAuthCheck) {
        toastError('이메일 인증이 필요합니다. 인증을 완료해주세요.')
        return
      }
      return await instance.post('/node/api/user/signup', data)
    },
    onSuccess: (res) => {
      if (res?.data.result === 'fail_email')
        toast.error('이미 존재하는 계정입니다.')
      else {
        toast.success('회원가입 되었습니다. 로그인 후 이용해주세요.')
        router.push('/login')
      }
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  return { postRegister }
}
