'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CiCircleInfo } from 'react-icons/ci'

import Button from '@/app/components/elements/Button'
import Input from '@/app/components/elements/Input'
import InputMessage from '@/app/components/elements/InputMessage'
import useTimer from '@/hooks/useTimer'

interface RegisterType {
  email: string
  password: string
  confirmPassword?: string
  nickname: string
}

export default function Page() {
  const [authNum, setAuthNum] = useState<string>()

  // 인증번호 유효시간
  const { timeLeft, startTimer, resetTimer } = useTimer(180) // 3분(180초) 타이머

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  // 회원가입 정보 유효성 검사 및 에러 메시지 출력
  const formSchema = yup.object({
    email: yup
      .string()
      .required('이메일은 필수 입력 정보입니다 입력해주세요')
      .email('이메일 형식이 아닙니다.'),
    password: yup
      .string()
      .required('영문, 숫자, 특수문자 포함 8자리를 입력해주세요.')
      .min(8, '최소 8자 이상 가능합니다')
      .max(16, '최대 20자 까지만 가능합니다')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[,./;'<>?:"~!@#$%^&*()])[a-zA-Z0-9,./;'<>?:"~!@#$%^&*()]{8,20}$/,
        '영문, 숫자, 특수문자 포함 8자리를 입력해주세요.'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
    nickname: yup.string().required('닉네임은 필수 입력 정보입니다'),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<RegisterType>({
    mode: 'onChange',
    resolver: yupResolver(formSchema),
  })

  // 인증번호 보내기
  const sendAuthNumber = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    startTimer()
  }

  // 인증번호 확인
  const confirmAuthNumber = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  // 회원가입 등록
  const registerUser = async (data: RegisterType) => {
    console.log(data)
    console.log('timeLeft', timeLeft)
  }

  return (
    <div className='flex justify-center w-full h-full'>
      <div className='flex flex-col items-center justify-center gap-4 mb-8 w-full max-w-96'>
        <form
          className={'w-full flex flex-col gap-6'}
          onSubmit={handleSubmit(registerUser)}
        >
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <Input
                label='이메일'
                direction={'column'}
                id='email'
                placeholder='이메일을 입력해주세요'
                {...register('email')}
              />
              {errors.email && <InputMessage msg={errors.email?.message} />}
            </div>
            <Button
              onClick={(e) => sendAuthNumber(e)}
              variant={watch('email') ? 'outline' : 'disabled'}
              disabled={!watch('email')}
              text='이메일 인증하기'
            />
          </div>
          {timeLeft !== 180 && (
            <div className='flex flex-col gap-1 bg-gray-50 px-2.5 py-3.5'>
              <span className={'text-xs pl-1'}>
                이메일로 받은 인증코드를 입력해주세요.
              </span>
              <div className={'flex w-full'}>
                <Input
                  id='authnum'
                  placeholder='인증코드 6자리'
                  direction={'column'}
                  value={authNum}
                  variant={timeLeft === 0 ? 'warning' : 'default'}
                  onChange={(e) => setAuthNum(e.target.value)}
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
                  onClick={(e) => confirmAuthNumber(e)}
                  className='text-sm text-green-400 w-12'
                >
                  확인
                </button>
              </div>
              {timeLeft === 0 && (
                <span className={'text-xs text-red-500'}>
                  {`
                  유효기간이 지났습니다.'이메일 재전송하기'를 눌러주세요`}
                </span>
              )}
              <div className={'flex gap-1 items-center text-gray-500 text-xs'}>
                <CiCircleInfo />
                <span>이메일을 받지 못하셨나요?</span>
                <a
                  // onClick={(e) => sendAuthNumber(e)}
                  className={'decoration-solid underline cursor-pointer'}
                >
                  이메일 재전송하기
                </a>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-1'>
            <Input
              label='비밀번호'
              direction={'column'}
              type='password'
              id='password'
              {...register('password')}
              placeholder='비밀번호를 입력해주세요'
            />
            {errors.password && <InputMessage msg={errors.password?.message} />}
          </div>
          <div className='flex flex-col gap-1'>
            <Input
              label='비밀번호확인'
              direction={'column'}
              type='password'
              id='confirmPassword'
              {...register('confirmPassword')}
              placeholder='비밀번호를 한번 더 입력해주세요'
            />
            {errors.confirmPassword && (
              <InputMessage msg={errors.confirmPassword?.message} />
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <Input
              label='닉네임'
              direction={'column'}
              id='nickname'
              {...register('nickname')}
              placeholder='닉네임을 입력해주세요'
            />
            {errors.nickname && <InputMessage msg={errors.nickname?.message} />}
          </div>
          <Button
            variant='fill'
            onClick={handleSubmit(registerUser)}
            // disabled={!(email !== "" && password !== "")}
            text='회원가입'
          />
        </form>
      </div>
    </div>
  )
}
