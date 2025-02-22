import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'A2C',
    short_name: 'A2C',
    description: 'All About Climbing, 클라이머들의 새로운 연결고리',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo/logo_mobile.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo/logo_mobile.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
