import toast from 'react-hot-toast'

// 토스트 알림 : 에러일 때
export const toastError = (text: string) => {
  if (text) {
    toast.dismiss()
    toast.error(text)
  }
}

// 토스트 알림 : 성공일 때
export const toastSuccess = (text: string) => {
  if (text) {
    toast.dismiss()
    toast.success(text)
  }
}
