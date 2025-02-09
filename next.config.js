module.exports = {
  images: {
    domains: [
      'postfiles.pstatic.net',
      'encrypted-tbn0.gstatic.com',
      'ldb-phinf.pstatic.net',
      'naverbooking-phinf.pstatic.net',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/node/:path*',
        destination: 'https://vm.a2climbing.com/:path*',
      },
      {
        source: '/python/:path*',
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
