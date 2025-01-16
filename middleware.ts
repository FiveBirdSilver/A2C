import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(request)
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
