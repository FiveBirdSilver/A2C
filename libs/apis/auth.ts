export async function getCheckAuth(sessionId?: {
  name: string
  value: string
}) {
  if (!sessionId?.name) return null

  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/account`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${sessionId?.name}=${sessionId?.value}`,
    },
    credentials: 'include',
  })

  return res.json()
}
