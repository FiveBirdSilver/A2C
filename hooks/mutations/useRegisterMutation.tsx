import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { apiClient } from '@/libs/apis/instance.ts'
import toast from 'react-hot-toast'

interface IRegister {
  email: string
  password: string
  confirmPassword?: string
  nickname: string
}

export const useRegisterMutation = () => {
  const router = useRouter()

  const postRegister = useMutation({
    mutationFn: async (data: IRegister) => {
      return await apiClient.post('/node/api/user/signup', data)
    },
    onSuccess: (res) => {
      if (res?.data.result === 'fail_email')
        toast.error('이미 존재하는 계정입니다.')
      else {
        toast.success('회원가입 되었습니다. 로그인 후 이용해주세요.')
        router.push('/login ')
      }
    },
    onError: (err: AxiosError) => {
      console.error(err)
      toast.error('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  return { postRegister }
}
