import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { instance } from '@/libs/apis/instance.ts'
import { toastError, toastSuccess } from '@/libs/utils/toast.ts'

interface IFindAccount {
  email: string
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

  return { postSendEmail }
}
