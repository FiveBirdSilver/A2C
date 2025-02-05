'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'

import Input from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import { useResetPassword } from '@/hooks/mutations/useResetPassword.tsx'
import { notify } from '@/libs/utils/notify.ts'

export default function Page() {
  const [email, setEmail] = useState<string>('')

  const { postSendEmail } = useResetPassword()

  const handleOnSendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) {
      notify('가입한 이메일 주소를 입력해주세요')
      return
    }
    postSendEmail.mutate({ email })
  }

  return (
    <div className='flex justify-center w-full h-full px-6'>
      <div className='flex flex-col items-center justify-center gap-4  w-full max-w-96'>
        <form
          className='w-full flex flex-col gap-6'
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleOnSendEmail(e)}
        >
          <Input
            label='이메일'
            id='email'
            type='email'
            direction={'row'}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder='가입한 이메일 주소를 입력해주세요'
          />
          <div className={'grid text-sm h-10'}>
            <Button
              variant={'primary'}
              onClick={() => {}}
              text='이메일로 인증코드 받기'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
