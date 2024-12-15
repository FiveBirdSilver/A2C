import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Providers from './provider'
import Wrapper from '@/components/layouts/Wrapper'
import '../assets/styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
          strategy='beforeInteractive'
        />
      </body>
    </html>
  )
}
