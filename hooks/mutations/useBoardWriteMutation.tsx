import { AxiosError, AxiosResponse } from 'axios'
import { router } from 'next/client'
import { useState } from 'react'

import { instance } from '@/libs/apis/instance.ts'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface IBoard {
  title: string
  content: string
  images: string[] | null
  type: string
  location?: {
    point: string
    lat: number
    lng: number
  } | null
  contentType: string
  price: number
  priceType: string
}

export const useBoardWriteMutation = () => {
  const router = useRouter()
  const [contentType, setContentType] = useState<string | null>(null)

  const postBoard = useMutation({
    mutationFn: async (data: IBoard) => {
      setContentType(data.contentType)
      const res = await instance.post('/node/api/board', data)
      return res.data
    },
    onSuccess: (res: AxiosResponse) => {
      router.push(`/board/detail/${res.data}?contentType=${contentType}`)
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toast.dismiss()
      toast.error('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  return { postBoard }
}
