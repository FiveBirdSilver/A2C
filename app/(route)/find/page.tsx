'use client'

import React, { ChangeEvent, useState } from 'react'
import Input from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import { useFindAccount } from '@/hooks/useFindAccount.tsx'

export default function Page() {
  const [email, setEmail] = useState<string>('')
  const { mutate } = useFindAccount()

  const handleOnSubmit = () => {
    mutate({ email })
  }

  return (
    <div className='flex justify-center w-full h-full px-6'>
      <div className='flex flex-col items-center justify-center gap-4  w-full max-w-96'>
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
        <Button
          variant={!email ? 'disabled' : 'fill'}
          onClick={handleOnSubmit}
          text='이메일로 인증코드 받기'
        />
      </div>
    </div>
  )
}
