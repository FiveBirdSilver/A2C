/**
 * 권한인증을 위한 체크 로직
 * @param sessionId
 */

export async function getCheckAuth(sessionId?: {
  name: string
  value: string
}) {
  if (!sessionId?.name) return null

  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/user/account`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${sessionId?.name}=${sessionId?.value}`,
    },
    credentials: 'include',
  })

  return res.json()
}
