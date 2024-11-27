import { toast } from 'react-toastify'

export const notify = (text: string) =>
  toast.error(text, {
    position: 'top-center',
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
  })
