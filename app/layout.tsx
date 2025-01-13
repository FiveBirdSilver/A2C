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
        <title>A2C</title>
      </head>
      <body>
        <Providers>
          <Wrapper>{children}</Wrapper>
        </Providers>
        <SpeedInsights />
        <Script
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}&submodules=geocoder`}
          strategy='beforeInteractive'
        />
      </body>
    </html>
  )
}
