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

  // 이미지 버킷 업로드 완료
  const [completeImages, setCompleteImages] = useState<string[]>()

  // gcs 체크
  const postGcsCheck = useMutation({
    mutationFn: async (data: IGCSCheck) => {
      const res = await instance.post('/node/api/board/checkfile', data)
      return res.data
    },
    onSuccess: (res) => {
      console.log('final success')
      console.log(res)

      setCompleteImages(Object.values(res.exists))
    },
    onError: (error: AxiosError) => {
      console.error(error)
      toastError('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  // gcs에 업로드
  const postGcsUploadImage = useMutation({
    mutationFn: async ({
      originalData,
      checkData,
    }: {
      originalData: { url: string; file: File | null }[]
      checkData: IGCSCheck
    }) => {
      const uploadPromises = originalData
        .filter((v) => v.file !== null)
        .map((v) =>
          axios.put(v.url, v.file, {
            headers: {
              'Content-Type': v.file?.type,
              'x-goog-content-length-range': '0,5242880',
            },
          })
        )
      const res = await Promise.all(uploadPromises)

      if (res.every((response) => response.status === 200)) {
        return checkData
      }

      throw new Error() // 실패시 예외를 던져서 onError가 실행되도록
    },
    onSuccess: (checkData: IGCSCheck) => {
      if (checkData) {
        postGcsCheck.mutate(checkData)
      }
    },

    onError: (error: AxiosError) => {
      console.error(error)
      toastError('일시적인 오류입니다. 다시 시도해주세요.')
    },
  })

  // 게시글 생성
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

  return { postGcsUploadImage, postGcsCheck, postBoard, completeImages }
}
