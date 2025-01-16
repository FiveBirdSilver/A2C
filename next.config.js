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
        source: '/route/:path*',
        destination: 'https://a2climbing.kro.kr/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
    ]
  },
  reactStrictMode: false,
}
