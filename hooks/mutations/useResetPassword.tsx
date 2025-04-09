import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance.ts'
import { toastError, toastSuccess } from '@/libs/utils/toast.ts'

interface IFindAccount {
  email: string
}

interface IResetPassword {
  token: string
  password: string
}

export const useResetPassword = () => {
  const router = useRouter()

  const postSendEmail = useMutation({
    mutationFn: async (data: IFindAccount) => {
      return await instance.post('/node/api/user/forget', data)
    },
    onSuccess: () => {
      toastSuccess('비밀번호 변경이 가능한 링크가 이메일로 전송되었습니다.')
      router.push('/')
    },
    onError: () => {
      toastError('유효하지 않은 이메일 주소입니다.')
    },
  })

  const resetPassword = useMutation({
    mutationFn: async (data: IResetPassword) => {
      return await instance.post(
        `/node/api/user/reset/${data.token}`,
        data.password
      )
    },
    onSuccess: () => {
      toastSuccess('비밀번호가 변경되었습니다. 로그인페이지로 이동합니다.')
      router.push('/login')
      return
    },
    onError: () => {
      toastError('비밀번호 변경에 실패하였습니다. 다시 재설정해주세요.')
      router.push('/user/password/find')
      return
    },
  })

  return { postSendEmail, resetPassword }
}
