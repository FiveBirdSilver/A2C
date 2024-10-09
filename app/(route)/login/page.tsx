'use client' //모듈이 클라이언트 번들의 일부로 간주

import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Input from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import { useLogin } from '@/app/apis/user/useLogin.tsx'

interface WarningType {
  email: boolean
  password: boolean
}

export default function Page() {
  const router = useRouter()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [warning, setWarning] = useState<WarningType>({
    email: false,
    password: false,
  })

  const { mutate, isError, isSuccess } = useLogin()

  useEffect(() => {
    if (isSuccess) router.push('/')
    if (isError) alert('아이디나 비밀번호가 일치하지 않습니다.')
  }, [isSuccess, isError, router])

  // 유효성 검사
  const validateForm = (): boolean => {
    const newWarning = {
      email: email.trim() === '',
      password: password.trim() === '',
    }

    setWarning(newWarning)
    return !newWarning.email && !newWarning.password
  }

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target

      if (id === 'email' || id === 'password') {
        const setter = id === 'email' ? setEmail : setPassword
        setter(value)

        if (value.trim()) {
          setWarning((prev) => ({ ...prev, [id]: false }))
        }
      }
    },
    []
  )

  // 로그인 폼 제출
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateForm()) mutate({ email, password })
  }

  return (
    <div className='flex justify-center w-full h-full'>
      <div className='flex flex-col items-center justify-center gap-4 mb-8 w-full max-w-96'>
        <Image
          src={'/logo_text.jpeg'}
          width={100}
          height={30}
          alt='logo'
          className='mb-5'
        />
        <form
          className='w-full flex flex-col gap-6'
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <>
            <Input
              label='이메일'
              type='email'
              id='email'
              direction={'row'}
              variant={warning.email ? 'warning' : 'default'}
              placeholder='이메일을 입력해주세요'
              value={email}
              onChange={(e) => handleOnChange(e)}
            />
            <Input
              label='비밀번호'
              id='password'
              type='password'
              direction={'row'}
              variant={warning.password ? 'warning' : 'default'}
              value={password}
              onChange={(e) => handleOnChange(e)}
              placeholder='비밀번호를 입력해주세요'
            />
          </>
          <Button variant='fill' onClick={() => handleOnSubmit} text='로그인' />
        </form>
        <div className='relative w-full mt-5 border-t border-gray-200 pt-9'>
          <p
            className='absolute text-sm text-center text-gray-500 -top-3 min-w-16 bg-body'
            style={{ left: '41%' }}
          >
            또는
          </p>
          <Button
            variant='outline'
            onClick={() => router.push('/register')}
            text='회원가입'
          />
        </div>
      </div>
    </div>
  )
}
