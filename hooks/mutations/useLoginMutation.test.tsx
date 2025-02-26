import { ChangeEvent, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useLoginMutation } from '@/hooks/mutations/useLoginMutation'
import { instance } from '@/libs/apis/instance'

// 모킹설정
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../libs/apis/instance.ts', () => ({
  instance: {
    post: jest.fn(),
    get: jest.fn(),
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

describe('useLoginMutation', () => {
  it('이메일 입력값 변경을 정상적으로 처리한다', () => {
    const { result } = renderHook(() => useLoginMutation(), { wrapper })

    act(() => {
      result.current.handleOnChange({
        target: { id: 'email', value: 'test@test.com' },
      } as ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.email).toBe('test@test.com')
    expect(result.current.warning.email).toBe(false)
  })

  it('폼 입력값을 올바르게 검증한다', () => {
    const { result } = renderHook(() => useLoginMutation(), { wrapper })

    act(() => {
      result.current.handleOnChange({
        target: { id: 'email', value: '' },
      } as ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      const isValid = result.current.validateForm()
      expect(isValid).toBe(false)
    })

    expect(result.current.warning.email).toBe(true)
  })

  it('로그인 API 호출에 성공하면 이전 페이지 이동한다', async () => {
    const mockedBack = jest.fn()
    const mockedRefresh = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockedBack,
      refresh: mockedRefresh,
    })
    ;(instance.post as jest.Mock).mockResolvedValueOnce({}) // post 메서드를 모킹하여 응답 설정

    const { result } = renderHook(() => useLoginMutation(), { wrapper })

    await act(async () => {
      await result.current.postLogin.mutateAsync()
    })

    // router.back() 및 router.refresh 메서드가 호출되었는지 확인
    expect(mockedBack).toHaveBeenCalled()
    expect(mockedRefresh).toHaveBeenCalled()
  })

  it('로그아웃 성공 시, 메인 페이지(홈)로 되돌아 간다.', async () => {
    const mockedPush = jest.fn()
    const mockedRefresh = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockedPush,
      refresh: mockedRefresh,
    })
    ;(instance.get as jest.Mock).mockResolvedValueOnce({})

    const { result } = renderHook(() => useLoginMutation(), { wrapper })

    await act(async () => {
      await result.current.postLogOut.mutateAsync()
    })

    expect(mockedPush).toHaveBeenCalledWith('/')
    expect(mockedRefresh).toHaveBeenCalled()
  })
})
