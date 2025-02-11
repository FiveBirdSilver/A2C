'use client'

import React, { useMemo } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

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
      <Toaster
        position='bottom-center'
        reverseOrder={false}
        gutter={16}
        containerStyle={{ bottom: '50px' }}
        toastOptions={{
          className: 'text-xs',
          duration: 5000,
          removeDelay: 10000,
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#5bac73',
              secondary: 'white',
            },
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default Providers
