import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
})

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: [
      'postfiles.pstatic.net',
      'encrypted-tbn0.gstatic.com',
      'ldb-phinf.pstatic.net',
      'naverbooking-phinf.pstatic.net',
      'storage.googleapis.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://vm.a2climbing.com/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true,
      },
      {
        source: '/user/mypage',
        destination: '/user/mypage/profile',
        permanent: true,
      },
    ]
  },
  reactStrictMode: false,
}
module.exports = withPWA(nextConfig)
