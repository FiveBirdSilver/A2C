import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(request)

  const response = NextResponse.next()

  // 헤더에 Content-Type을 설정
  response.headers.set('Content-Type', 'text/x-component')

  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: '/login', // 필요한 경로에 맞게 설정
}
