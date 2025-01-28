import { ReactNode } from 'react'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Providers from './provider'
import '@/assets/styles/global.css'
import Spinner from '@/components/elements/Spinner.tsx'

const Wrapper = dynamic(() => import('@/components/layouts/Wrapper'), {
  loading: () => <Spinner />,
  ssr: true,
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <title>A2C</title>
      </head>
      <body>
        <Providers>
          <Wrapper>{children}</Wrapper>
        </Providers>
        <SpeedInsights />
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
          strategy='beforeInteractive'
        />
      </body>
    </html>
  )
}
