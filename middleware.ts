// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // /login 요청에 대해 URL 업데이트
  if (url.pathname === '/login') {
    // 여기서 destination 설정
    return NextResponse.redirect(new URL('/board', req.url))
  }
}
