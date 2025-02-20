import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'

import { instance } from '@/libs/apis/instance.ts'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toastError } from '@/libs/utils/toast.ts'

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

  const postUploadImage = useMutation({
    mutationFn: async (data: { url: string; file: File | null }[]) => {
      const uploadPromises = data
        .filter((v) => v.file !== null)
        .map((v) =>
          axios.put(v.url, v.file, {
            withCredentials: true,
            headers: {
              'Content-Type': v.file?.type, // 파일의 Content-Type 설정
            },
          })
        )
      const res = await Promise.all(uploadPromises) // 모든 업로드 완료 대기
      console.log(res) // 응답 결과 확인
      return res[0]
    },
    onError: (error: AxiosError) => {
      // 오류 처리
      console.error(error)
      toastError('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

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
      toastError('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  return { postUploadImage, postBoard }
}
