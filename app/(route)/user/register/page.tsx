'use client'
import { MouseEvent } from 'react'
import { CiCircleInfo } from 'react-icons/ci'
import toast from 'react-hot-toast'

import Button from '@/components/elements/Button.tsx'
import Input from '@/components/elements/Input.tsx'
import { formatTime } from '@/libs/utils/formatTime.ts'
import useTimer from '@/hooks/common/useTimer.tsx'
import useVerifyMutation from '@/hooks/mutations/useVerifyMutation.tsx'
import { useRegisterMutation } from '@/hooks/mutations/useRegisterMutation.tsx'
import useField from '@/hooks/common/useForm.tsx'

export default function Page() {
  const { register, handleSubmit, watch, errors } = useField()
  const { postRegister } = useRegisterMutation()
  const {
    postSendCode,
    postVerifyCheck,
    authCode,
    openAuthCodeBox,
    isAuthCheck,
    setOpenAuthCodeBox,
    handleOnChange,
  } = useVerifyMutation()

  // 인증번호 유효시간
  const { timeLeft, startTimer, resetTimer } = useTimer(180) // 3분(180초) 타이머

  // 인증번호 보내기
  const handleOnSendCode = async (
    event: MouseEvent<HTMLButtonElement>,
    type: 'start' | 'reset'
  ) => {
    event.preventDefault()
    setOpenAuthCodeBox(true)
    postSendCode.mutate({ email: watch('email') })

    type === 'start' ? startTimer() : resetTimer()
  }

  // 인증번호 확인
  const confirmAuthNumber = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    postVerifyCheck.mutate({
      email: watch('email'),
      code: authCode,
    })
  }

  const handleOnRegister = () => {
    if (!isAuthCheck) {
      toast.dismiss()
      toast.error('이메일 인증이 필요합니다. 인증을 완료해주세요.')
      return
    }
    postRegister.mutate({ ...watch() })
  }

  return (
    <div className='flex justify-center w-full h-full px-[1rem]'>
      <div className='flex flex-col items-center justify-center gap-4  w-full max-w-96'>
        <form
          className={'w-full flex flex-col gap-6'}
          onSubmit={handleSubmit(() => handleOnRegister())}
        >
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <Input
                id='email'
                label='이메일'
                direction={'column'}
                placeholder='이메일을 입력해주세요'
                message={errors.email?.message}
                {...register('email')}
              />
            </div>
            <div className={'grid text-sm h-8'}>
              <Button
                onClick={(e) => handleOnSendCode(e, 'start')}
                variant={watch('email') ? 'outline' : 'disabled'}
                disabled={!watch('email')}
                text='이메일 인증하기'
              />
            </div>
          </div>
          {openAuthCodeBox && (
            <div className='flex flex-col gap-1 bg-gray-50 px-2.5 py-3.5'>
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
                  onChange={handleOnChange}
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
                  onClick={(e) => confirmAuthNumber(e)}
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
                  onClick={(e) => handleOnSendCode(e, 'reset')}
                  className={'decoration-solid underline cursor-pointer'}
                >
                  이메일 재전송하기
                </button>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-1'>
            <Input
              id='password'
              type='password'
              label='비밀번호'
              direction={'column'}
              message={errors.password?.message}
              placeholder='비밀번호를 입력해주세요'
              {...register('password')}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Input
              label='비밀번호확인'
              direction={'column'}
              type='password'
              id='confirmPassword'
              message={errors.confirmPassword?.message}
              placeholder='비밀번호를 한번 더 입력해주세요'
              {...register('confirmPassword')}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Input
              label='닉네임'
              direction={'column'}
              id='nickname'
              message={errors.nickname?.message}
              placeholder='닉네임을 입력해주세요'
              {...register('nickname')}
            />
          </div>
          <div className='grid h-10 text-sm'>
            <Button
              variant='primary'
              onClick={handleSubmit(() => handleOnRegister())}
              // disabled={!(email !== "" && password !== "")}
              text='회원가입'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
