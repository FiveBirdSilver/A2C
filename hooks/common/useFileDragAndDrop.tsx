import { MouseEvent, useCallback, useState } from 'react'
import dayjs from 'dayjs'

import { toastError } from '@/libs/utils/toast.ts'
import { instance } from '@/libs/apis/instance.ts'

interface IFiles {
  where: string
  date: string
  filename: string
  filetype: string
}

const useFileDragAndDrop = () => {
  // 원본 이미지 상태
  const [uploadOriginImages, setUploadOriginImages] = useState<File[]>()

  // 이미지 스토리지 주소
  const [imageStorageUrl, setImageStorageUrl] = useState<string[]>([])

  // 이미지 프리뷰
  const [imagesPreview, setImagesPreview] = useState<string[]>([])

  let imageCount = 0

  const formData = new FormData()

  // 게시글 생성 전 이미지 업로드의 스토리지 주소를 Response 받기 위함
  const uploadStorage = async (files: IFiles[], endPoint: string) => {
    try {
      // 여러 파일을 동시에 업로드
      const uploadPromises = files.map((file) =>
        instance.post(`/node/api/${endPoint}`, file)
      )

      const responses = await Promise.all(uploadPromises)

      // 각 파일의 업로드 응답 처리
      responses.forEach((response) => {
        setImageStorageUrl((prev) => [...prev, response.data.url])
      })
    } catch (error) {
      toastError('업로드에 실패했습니다')
      setImagesPreview([])
      console.error(error)
    }
  }

  // 이미지 드래그앤드롭
  const dragFile = useCallback(
    async (files: FileList | File[], endPoint: string, where: string) => {
      if (!files) return
      imageCount += files.length

      // 현재 업로드된 이미지 개수 확인
      if (imageCount > 5) {
        toastError('최대 5장의 이미지만 업로드할 수 있습니다')
        return
      }

      const newFilesForStorage: IFiles[] = []
      const newFiles = []

      for (const file of files) {
        //  파일 확장자 추출 후 검사
        const extension = file.name.split('.').pop()?.toLowerCase()
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']

        if (!extension || !allowedExtensions.includes(extension)) {
          toastError('지원하는 형식이 아닙니다.')
          return
        }

        const fileData: IFiles = {
          filename: file.name,
          filetype: file.type,
          date: dayjs(file.lastModified).format('YYYYMMDD'),
          where: `board_${where}`,
        }

        newFiles.push(file)
        newFilesForStorage.push(fileData)
        setImagesPreview((prev) => [...prev, URL.createObjectURL(file)])
      }

      if (newFilesForStorage.length > 0) {
        setUploadOriginImages(newFiles)
        await uploadStorage(newFilesForStorage, endPoint)
      }
    },
    []
  )

  // 업로드 시작
  const startUpload = async () => {}

  // 업로드 취소
  const abortUpload = (e: MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return {
    imageStorageUrl,
    uploadOriginImages,
    imagesPreview,
    dragFile,
    formData,
    startUpload,
    abortUpload,
  }
}

export default useFileDragAndDrop
