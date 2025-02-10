export default function timeAgo(dateString: string): string {
  const givenTime = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - givenTime.getTime()) / 1000)

  if (diffInSeconds < 10) {
    return '방금 전'
  }
  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 5) {
    return `${diffInDays}일 전`
  }

  return givenTime.toISOString().split('T')[0]
}
