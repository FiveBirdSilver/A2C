import { ReactNode } from 'react'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Providers from './provider'
import '@/assets/styles/global.css'
import Spinner from '@/components/elements/Spinner.tsx'
import { Metadata, Viewport } from 'next'

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
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
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

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'A2C',
  description: 'All About Climbing, 클라이머들의 새로운 연결고리',
  manifest: '/manifest.ts',
  icons: {
    icon: '/logo/logo_mobile.png',
    shortcut: '/logo/logo_mobile.png',
    apple: '/logo/logo_mobile.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo/logo_mobile.png',
    },
  },
}
