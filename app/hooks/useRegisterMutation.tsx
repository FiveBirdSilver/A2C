import { useMutation } from '@tanstack/react-query'
import instance from '@/app/libs/apis/instance.ts'
import { AxiosError } from 'axios'
import { notify } from '@/libs/utils/notify.ts'
import { useRouter } from 'next/navigation'

interface RegisterType {
  email: string
  password: string
  confirmPassword?: string
  nickname: string
}

// test@test.com, gp7181811
export const useRegisterMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (data: RegisterType) => {
      return await instance.post('/user/signup', data)
    },
    onSuccess: (res) => {
      if (res.data.result === 'fail_email') notify('이미 존재하는 계정입니다.')
      else router.push('/')
    },
    onError: (err: AxiosError) => {
      console.error(err)
      notify('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })
}
