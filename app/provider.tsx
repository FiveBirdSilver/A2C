'use client'

import React from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  )

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default Providers
