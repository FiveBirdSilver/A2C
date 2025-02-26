import { ChangeEvent, MouseEvent, ReactNode } from 'react'
import { render, renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { instance } from '@/libs/apis/instance'
import useVerifyMutation from '@/hooks/mutations/useVerifyMutation.tsx'
import Page from '@/app/(route)/user/register/page.tsx'
import { toastError } from '@/libs/utils/toast.ts'

// 모킹설정
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../libs/apis/instance', () => ({
  instance: {
    post: jest.fn(),
  },
}))

jest.mock('../../libs/utils/toast.ts', () => ({
  toastError: jest.fn(),
  toastSuccess: jest.fn(),
}))

const queryClient = new QueryClient()

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useVerifyMutation', () => {
  it('이메일 인증하기 버튼을 누르면 인증번호가 전송되고 유효시간 3분 카운트 된다.', async () => {
    const { result } = renderHook(() => useVerifyMutation(), { wrapper })
    render(<Page />, { wrapper })

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>
    const email = 'test@test.com'
    ;(instance.post as jest.Mock).mockResolvedValueOnce({})

    await act(async () => {
      await result.current.handleOnSendCode(mockEvent, email, 'start')
    })

    expect(mockEvent.preventDefault).toHaveBeenCalled()
    expect(result.current.openAuthCodeBox).toBe(true)
    // 타이머 시작
    expect(result.current.timeLeft).toBeGreaterThan(0)

    await act(async () => {
      await result.current.postSendCode.mutateAsync({ email: email })
    })
  })

  it('인증번호를 입력하면 authCode 상태가 변경된다.', () => {
    const { result } = renderHook(() => useVerifyMutation(), { wrapper })

    act(() => {
      result.current.handleOnChange({
        target: { value: '123456' },
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.authCode).toBe('123456')
  })

  it('입력한 인증번호가 서버에서 성공적으로 검증되면 인증상태를 변경한다.', async () => {
    const { result } = renderHook(() => useVerifyMutation(), { wrapper })
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>

    const email = 'test@test.com'
    result.current.authCode = '123456'
    ;(instance.post as jest.Mock).mockResolvedValueOnce({})

    await act(async () => {
      // 인증번호 확인 요청
      await result.current.confirmAuthNumber(mockEvent, email)
      // 서버 검증 요청이 완료되도록 대기
      await result.current.postVerifyCheck.mutateAsync({
        email: email,
        code: '123456',
      })
    })

    expect(result.current.isAuthCheck).toBe(true)
    expect(result.current.openAuthCodeBox).toBe(false)
  })

  it('입력한 인증번호가 서버에서 검증 실패하면 인증상태가 변경되지 않고 오류 메시지가 표시된다.', async () => {
    const { result } = renderHook(() => useVerifyMutation(), { wrapper })
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>

    const email = 'test@test.com'
    result.current.authCode = '123456'
    ;(instance.post as jest.Mock).mockRejectedValueOnce(
      new AxiosError('Invalid verification code', '400')
    )

    await act(async () => {
      // 인증번호 확인 요청
      await result.current.confirmAuthNumber(mockEvent, email)
    })

    expect(result.current.isAuthCheck).toBe(false)
    expect(result.current.openAuthCodeBox).toBe(false)

    expect(toastError).toHaveBeenCalledWith(
      '인증에 실패했습니다. 다시 시도해주세요.'
    )
  })
})
