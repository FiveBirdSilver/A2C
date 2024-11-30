'use client' //모듈이 클라이언트 번들의 일부로 간주

import Image from 'next/image'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import Input from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation.tsx'

export default function Page() {
  const router = useRouter()
  const { login, handleOnChange, validateForm, warning, email, password } =
    useLoginMutation()

  // 로그인 폼 제출
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateForm()) login.mutate()
  }

  return (
    <div className='flex justify-center w-full h-full px-[1rem]'>
      <div className='flex flex-col items-center justify-center gap-4  w-full max-w-96'>
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
          <Button
            variant='primary'
            onClick={() => handleOnSubmit}
            text='로그인'
          />
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
        <span
          className='underline text-[0.7rem] mt-3 text-gray-500 cursor-pointer'
          onClick={() => router.push('/find')}
        >
          비밀번호를 잊으셨나요?
        </span>
      </div>
    </div>
  )
}
