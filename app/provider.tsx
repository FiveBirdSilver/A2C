'use client'

import React, { useMemo } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      }),
    []
  )

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* 조건부 DevTools 렌더링: 개발 환경에서만 렌더링 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default Providers
