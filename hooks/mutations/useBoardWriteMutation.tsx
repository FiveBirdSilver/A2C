import axios, { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'

import { instance } from '@/libs/apis/instance.ts'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toastError } from '@/libs/utils/toast.ts'
import { IGCSCheck } from '@/hooks/common/useFileDragAndDrop.tsx'

interface IBoard {
  title: string
  content: string
  images: string[] | unknown[]
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

  // 게시글 생성
  const postBoard = useMutation({
    mutationFn: async (data: IBoard) => {
      setContentType(data.contentType)
      const res = await instance.post('/node/api/board', data)
      return res.data
    },
    onSuccess: (res: AxiosResponse) => {
      router.push(`/${contentType}/${res.data}`)
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toastError('글 작성에 실패했습니다. 다시 시도해주세요.')
    },
  })

  // gcs 체크
  const postGcsCheck = useMutation({
    mutationFn: async (data: IGCSCheck) => {
      const res = await instance.post('/node/api/board/checkfile', data)
      return res.data
    },
  })

  const postGcsUploadImage = useMutation({
    mutationFn: async ({
      data,
    }: {
      data: { url: string; file: File | null }[]
    }) => {
      const uploadPromises = data
        .filter((v) => v.file !== null)
        .map((v) =>
          axios.put(v.url, v.file, {
            headers: {
              'Content-Type': v.file?.type,
              'x-goog-content-length-range': '0,5242880',
            },
          })
        )
      await Promise.all(uploadPromises)
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toastError('업로드에 실패 했습니다. 다시 시도해주세요.')
    },
  })

  return {
    postGcsUploadImage,
    postGcsCheck,
    postBoard,
  }
}
