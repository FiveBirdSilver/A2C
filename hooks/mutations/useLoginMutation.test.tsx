import { ChangeEvent, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { renderHook, act } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useLoginMutation } from '@/hooks/mutations/useLoginMutation'
import { instance } from '@/libs/apis/instance'

// instance 모킹
jest.mock('@libs/apis/instance', () => ({
  post: jest.fn(),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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

    const isValid = result.current.validateForm()
    expect(isValid).toBe(false)
    expect(result.current.warning.email).toBe(true)
  })

  it('로그인 API 호출에 성공하면 홈으로 이동한다', async () => {
    const mockedPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockedPush })
    ;(instance.post as jest.Mock).mockResolvedValueOnce({})
    const { result } = renderHook(() => useLoginMutation(), { wrapper })

    await act(async () => {
      await result.current.postLogin.mutateAsync()
    })

    expect(mockedPush).toHaveBeenCalledWith('/')
  })
})
