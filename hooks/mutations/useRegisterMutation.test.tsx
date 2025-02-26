import { ChangeEvent, MouseEvent, ReactNode } from 'react'
import { render, renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { instance } from '@/libs/apis/instance'
import useVerifyMutation from '@/hooks/mutations/useVerifyMutation.tsx'
import Page from '@/app/(route)/user/register/page.tsx'
import { AxiosError } from 'axios'
import { toastError, toastSuccess } from '@/libs/utils/toast.ts'
import { useRegisterMutation } from '@/hooks/mutations/useRegisterMutation.tsx'
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation.tsx'
import { useRouter } from 'next/navigation'

jest.mock('../../libs/apis/instance', () => ({
  instance: {
    post: jest.fn(),
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../libs/utils/toast.ts', () => ({
  toastError: jest.fn(),
  toastSuccess: jest.fn(),
}))

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useRegisterMutation', () => {
  it('인증번호 검증 여부를 확인 후, 되어 있지 않으면 알림을 띄운다', async () => {
    const mockedPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockedPush,
    })
    const { result } = renderHook(() => useRegisterMutation(), { wrapper })

    await act(async () => {
      await result.current.postRegister.mutateAsync({
        isAuthCheck: false,
        data: {
          email: 'test@test.com',
          password: 'gp1111',
          confirmPassword: 'gp1111',
          nickname: '닉네임',
        },
      })
    })
    expect(toastError).toHaveBeenCalledWith(
      '이메일 인증이 필요합니다. 인증을 완료해주세요.'
    )
  })

  it('인증번호 검증 여부 성공 시 회원가입이 되고 로그인 페이지로 이동한다.', async () => {
    const mockedPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockedPush,
    })

    const { result } = renderHook(() => useRegisterMutation(), { wrapper })

    await act(async () => {
      await result.current.postRegister.mutateAsync({
        isAuthCheck: true,
        data: {
          email: 'test@test.com',
          password: 'gp1111',
          confirmPassword: 'gp1111',
          nickname: '닉네임',
        },
      })
    })

    expect(mockedPush).toHaveBeenCalledWith('/login')
  })
})
