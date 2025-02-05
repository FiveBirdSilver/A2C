'use client'

import Image from 'next/image'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { RiKakaoTalkFill } from 'react-icons/ri'

import Input from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation.tsx'

export default function Page() {
  const router = useRouter()
  const {
    postLogin,
    handleOnChange,
    validateForm,
    warning,
    email,
    password,
    handleOnKaKaoLogin,
  } = useLoginMutation()

  // 로그인 폼 제출
  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (validateForm()) postLogin.mutate()
  }

  return (
    <div className='flex justify-center w-full h-full px-[1rem]'>
      <div className='flex flex-col items-center justify-center gap-4  w-full max-w-96'>
        <Image
          src={'/logo.png'}
          width={180}
          height={45}
          alt='logo'
          className='mb-5'
        />
        <form
          className='w-full flex flex-col gap-6 text-sm'
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
          <div className={'grid h-10'}>
            <Button
              variant='primary'
              onClick={() => handleOnSubmit}
              text='로그인'
            />
          </div>
        </form>
        <div className='relative w-full mt-5 border-t border-gray-200 pt-9'>
          <p
            className='absolute text-sm text-center text-gray-500 -top-3 min-w-16 bg-body'
            style={{ left: '41%' }}
          >
            또는
          </p>
          <button
            onClick={handleOnKaKaoLogin}
            className='w-full h-10  cursor-pointer text-sm flex items-center justify-center gap-2 bg-[#FEE500] rounded-md'
          >
            <RiKakaoTalkFill />
            <span>카카오 계정으로 계속하기</span>
          </button>
        </div>
        <div className='flex gap-2 mt-3'>
          <span
            className='underline text-[0.7rem] text-gray-500 cursor-pointer'
            onClick={() => router.push('/user/password/find')}
          >
            비밀번호 재설정
          </span>
          <span className='text-[0.7rem] text-gray-500'>|</span>
          <span
            className='underline text-[0.7rem] text-gray-500 cursor-pointer'
            onClick={() => router.push('/user/register')}
          >
            이메일로 회원가입
          </span>
        </div>
      </div>
    </div>
  )
}
