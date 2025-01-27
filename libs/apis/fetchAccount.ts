export async function fetchAccount(sessionId?: {
  name: string
  value: string
}) {
  if (!sessionId?.name) return null

  const url = `https://a2climbing.kro.kr/node/api/account`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: `${sessionId?.name}=${sessionId?.value}`,
    },
    credentials: 'include',
  })

  return res.json()
}
