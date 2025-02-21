import { useCallback, useState } from 'react'
import dayjs from 'dayjs'

import { toastError } from '@/libs/utils/toast.ts'
import { instance } from '@/libs/apis/instance.ts'

interface IFiles {
  where: string
  date: string
  filename: string
  filetype: string
}

export interface IGCSCheck {
  where: string
  date: string
  filename: string[]
}

const useFileDragAndDrop = () => {
  // 원본 이미지 상태
  const [uploadOriginImages, setUploadOriginImages] = useState<File[]>()

  // 이미지 스토리지 주소
  const [imageStorageUrl, setImageStorageUrl] = useState<string[]>([])

  // GCS 검증을 위함
  const [imageForGCSCheck, setImageForGCSCheck] = useState<IGCSCheck>()

  // 이미지 프리뷰
  const [imagesForPreview, setImagesForPreview] = useState<string[]>([])

  const now = dayjs()

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
      setImagesForPreview([])
      console.error(error)
    }
  }

  // 이미지 드래그앤드롭
  const dragFile = useCallback(
    async (files: FileList | File[], endPoint: string, where: string) => {
      if (!files) return

      // 현재 업로드된 이미지 개수와 새로 추가하려는 파일 개수를 합산해 제한 확인
      const currentImageCount = imagesForPreview.length // 기존 프리뷰 이미지 개수 사용
      const newImageCount = currentImageCount + files.length

      if (newImageCount > 5) {
        toastError('최대 5장의 이미지만 업로드할 수 있습니다')
        return
      }

      const newFiles: File[] = []
      const newFilesForStorage: IFiles[] = []
      const newFilesForGCSCheck = []

      for (const file of files) {
        // 파일 확장자 추출 후 검사
        const extension = file.name.split('.').pop()?.toLowerCase()
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']

        if (!extension || !allowedExtensions.includes(extension)) {
          toastError('지원하는 형식이 아닙니다.')
          return
        }

        // storageURL을 받기 위한 REQ
        const fileData: IFiles = {
          filename: file.name,
          filetype: file.type,
          date: now.format('YYYYMMDD'),
          where: `board_${where}`,
        }

        newFiles.push(file)
        newFilesForStorage.push(fileData)
        newFilesForGCSCheck.push(file.name)

        setImagesForPreview((prev) => [...prev, URL.createObjectURL(file)])
      }

      if (newFilesForStorage.length > 0) {
        setUploadOriginImages((prev) =>
          prev ? [...prev, ...newFiles] : newFiles
        )
        setImageForGCSCheck({
          where: `board_${where}`,
          date: now.format('YYYYMMDD'),
          filename: newFilesForGCSCheck,
        })
        await uploadStorage(newFilesForStorage, endPoint)
      }
    },
    [imagesForPreview, now]
  )

  return {
    imageStorageUrl,
    uploadOriginImages,
    imageForGCSCheck,
    imagesForPreview,
    dragFile,
  }
}

export default useFileDragAndDrop
