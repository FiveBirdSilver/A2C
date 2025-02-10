export default function CopyURL() {
  const url = window.location.href
  console.log(url.split('/board'))
  navigator.clipboard
    .writeText(url)
    .then(() => {
      // console.log(url)
      // console.log('URL이 클립보드에 복사되었습니다.')
    })
    .catch((err) => {
      console.error('URL 복사 실패:', err)
    })
}
