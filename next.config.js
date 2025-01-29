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
        destination: 'https://api.a2climbing.com/:path*',
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
    ]
  },
  reactStrictMode: false,
}
