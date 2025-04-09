'use client'

import React, { FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'

import Input from '@/components/elements/Input.tsx'
import { useResetPassword } from '@/hooks/mutations/useResetPassword.tsx'
import { toastError } from '@/libs/utils/toast.ts'
import useField from '@/hooks/common/useForm'
import Button from '@/components/elements/Button'

export default function Page() {
  const { register, handleSubmit, watch, errors } = useField()
  const router = useRouter()
  const param = useParams()
  const token = param.token

  const { resetPassword } = useResetPassword()

  const handleOnResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!token || typeof token !== 'string') {
      toastError('주소가 유효하지 않습니다. 다시 재설정해주세요.')
      router.push('/user/password/find')
      return
    }
    resetPassword.mutate({ token, password: watch('password') })
  }

  return (
    <div className='flex justify-center w-full h-full px-6'>
      <div className='flex flex-col items-center justify-center gap-4  w-full max-w-96'>
        <form
          className='w-full flex flex-col gap-6'
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleOnResetPassword(e)}
        >
          <Input
            id='password'
            type='password'
            label='비밀번호'
            direction={'column'}
            message={errors.password?.message}
            placeholder='비밀번호를 입력해주세요'
            {...register('password')}
          />
          <Input
            label='비밀번호확인'
            direction={'column'}
            type='password'
            id='confirmPassword'
            message={errors.confirmPassword?.message}
            placeholder='비밀번호를 한번 더 입력해주세요'
            {...register('confirmPassword')}
          />
          <div className='grid h-10 text-sm'>
            <Button
              variant='primary'
              onClick={handleSubmit(() => handleOnResetPassword)}
              text='비밀번호 재설정'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
