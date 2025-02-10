import { useCallback, useState, ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import { instance } from '@/libs/apis/instance.ts'
import toast from 'react-hot-toast'

interface IWarning {
  email: boolean
  password: boolean
}

export const useLoginMutation = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [warning, setWarning] = useState<IWarning>({
    email: false,
    password: false,
  })

  // 로그인
  const postLogin = useMutation({
    mutationFn: async () => {
      return await instance.post('/node/api/user/login', { email, password })
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error: AxiosError) => {
      const status = error.response?.status
      toast.dismiss()
      if (status === 400 || status === 401)
        toast.error('아이디나 비밀번호가 일치하지 않습니다. 다시 시도해주세요.')
      else toast.error('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  const postLogOut = useMutation({
    mutationFn: async () => {
      return await instance.get('/node/api/user/logout')
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toast.error('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  // 카카오로 로그인하기
  const handleOnKaKaoLogin = () => {
    location.href = `${process.env.NEXT_PUBLIC_API_URL}/node/kakaoLogin`
  }

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target

    if (id === 'email' || id === 'password') {
      const setter = id === 'email' ? setEmail : setPassword
      setter(value)

      if (value.trim()) {
        setWarning((prev) => ({ ...prev, [id]: false }))
      }
    }
  }, [])

  // 유효성 검사
  const validateForm = (): boolean => {
    const newWarning = {
      email: email.trim() === '',
      password: password.trim() === '',
    }

    setWarning(newWarning)
    return !newWarning.email && !newWarning.password
  }

  return {
    postLogin,
    postLogOut,
    handleOnChange,
    validateForm,
    warning,
    email,
    password,
    handleOnKaKaoLogin,
  }
}
