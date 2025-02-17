'use server'

import { cookies } from 'next/headers'

export async function setBoardCookieAction(cookie: string) {
  const cookieStore = await cookies()
  const name = cookie.split(';')[0].split('=')[0] || ''
  const value = cookie.split(';')[0].split('=')[1] || ''

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // domain: '.a2climbing.com',
  })
}
