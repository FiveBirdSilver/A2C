import { useCallback, useState, ChangeEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

import instance from '@/libs/apis/instance.ts'

interface IWarning {
  email: boolean
  password: boolean
}

// test@test.com, gp7181811
export const useLoginMutation = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [warning, setWarning] = useState<IWarning>({
    email: false,
    password: false,
  })

  const login = useMutation({
    mutationFn: async () => {
      return await instance.post('/user/login', { email, password })
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error: AxiosError) => {
      console.error(error)
      alert('아이디나 비밀번호가 일치하지 않습니다.') // 상태코드 반환 안됌 확인 필요
    },
  })

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

  return { login, handleOnChange, validateForm, warning, email, password }
}