'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci'

import Input from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import useTimer from '@/hooks/common/useTimer.tsx'
import { useResetPassword } from '@/hooks/mutations/useResetPassword.tsx'
import { formatTime } from '@/libs/utils/formatTime.ts'

export default function Page() {
  const [email, setEmail] = useState<string>('')
  const [authCode, setAuthCode] = useState<string>('')

  const { sendEmail, isSending } = useResetPassword()
  const { timeLeft, startTimer, resetTimer } = useTimer(180) // 3분(180초) 타이머

  const handleOnSendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendEmail.mutate({ email })
    startTimer()
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
          <Button
            variant={!email || isSending ? 'disabled' : 'primary'}
            onClick={() => sendEmail.mutate({ email })}
            text='이메일로 인증코드 받기'
          />
        </form>
        {isSending && (
          <div className='flex flex-col gap-1 w-full mt-4'>
            <span className={'text-xs pl-1'}>
              이메일로 받은 인증코드를 입력해주세요.
            </span>
            <div className={'flex w-full'}>
              <Input
                id='authnum'
                label={''}
                placeholder='인증코드 6자리'
                direction={'column'}
                value={authCode}
                variant={timeLeft === 0 ? 'warning' : 'default'}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAuthCode(e.target.value)
                }
                maxLength={6}
              >
                <p
                  className={
                    'text-red-500 text-xs absolute right-[10px] top-[12px]'
                  }
                >
                  {formatTime(timeLeft)}
                </p>
              </Input>
              <button
                onClick={(e) => console.log(e)}
                className='text-sm text-green-400 w-12'
              >
                확인
              </button>
            </div>
            {timeLeft === 0 && (
              <span className={'text-xs text-red-500'}>
                {`유효기간이 지났습니다. '이메일 재전송하기'를 눌러주세요`}
              </span>
            )}
            <div className={'flex gap-1 items-center text-gray-500 text-xs'}>
              <CiCircleInfo />
              <span>이메일을 받지 못하셨나요?</span>
              <button
                onClick={() => {
                  sendEmail.mutate({ email })
                  resetTimer()
                }}
                className={'decoration-solid underline cursor-pointer'}
              >
                이메일 재전송하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
