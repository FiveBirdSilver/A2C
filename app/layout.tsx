import { ReactNode } from 'react'
import { Metadata, Viewport } from 'next'
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Providers from './provider'
import '@/assets/styles/global.css'
import Spinner from '@/components/ui/Spinner'

const Wrapper = dynamic(() => import('@/components/layouts/Wrapper'), {
  loading: () => <Spinner />,
  ssr: true,
})

export const metadata: Metadata = {
  title: 'A2C - All About Climbing',
  description:
    'A2C는 클라이머들을 위한 커뮤니티 플랫폼입니다. 주변 클라이밍 짐을 찾고, 클라이밍 크루를 만들고, 다양한 정보를 교류하세요!',
  keywords: [
    '클라이밍',
    '클라이밍 짐',
    '암벽 등반',
    '실내 암벽',
    '클라이밍 커뮤니티',
    'A2C',
  ],
  manifest: '/manifest.ts',
  icons: {
    icon: '/logo/logo_mobile.png',
    shortcut: '/logo/logo_mobile.png',
    apple: '/logo/logo_mobile.png',
  },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'A2C - All About Climbing',
    description:
      'A2C는 클라이머들을 위한 커뮤니티 플랫폼입니다. 주변 클라이밍 짐을 찾고, 클라이밍 크루를 만들고, 다양한 정보를 교류하세요!',
    url: 'https://www.a2climbing.com',
    images: [
      {
        url: 'https://www.a2climbing.com/logo/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A2C - All About Climbing',
      },
    ],
    siteName: 'A2C',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A2C - All About Climbing',
    description:
      '클라이머들을 위한 커뮤니티! 클라이밍 짐 찾기, 크루 모집, 정보 공유까지.',
    images: ['https://www.a2climbing.com/logo/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
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
