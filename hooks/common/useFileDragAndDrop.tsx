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

// 게시글 생성 전 이미지 업로드의 스토리지 주소를 Response 받기 위함
const uploadStorage = async (files: IFiles[], endPoint: string) => {
  try {
    // 여러 파일을 동시에 업로드
    const uploadPromises = files.map((file) =>
      instance.post(`/node/api/${endPoint}`, file)
    )

    const responses = await Promise.all(uploadPromises)

    // 각 파일의 업로드 응답 처리
    responses.forEach((response, index) => {
      console.log(index, response.data)
    })
  } catch (error) {
    toastError('업로드에 실패했습니다')
    console.error(error)
  }
}

const useFileDragAndDrop = () => {
  const [uploadOriginImages, setUploadOriginImages] = useState<File[]>()
  const [uploadImageName, setUploadImageName] = useState<IFiles[]>([])
  const [imagesPreview, setImagesPreview] = useState<string[]>([])

  const formData = new FormData()

  // 이미지 드래그앤드롭
  const dragFile = useCallback(
    async (files: FileList | File[], endPoint: string, where: string) => {
      if (!files) return

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
        // setUploadOriginImages(newFiles)
        // setImagesPreview(newFiles)
        await uploadStorage(newFilesForStorage, endPoint)
      }
    },
    []
  )

  // 업로드 시작
  const startUpload = async () => {}

  // 업로드 취소
  const abortUpload = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation()
  }

  return {
    uploadOriginImages,
    setUploadOriginImages,
    uploadImageName,
    setUploadImageName,
    imagesPreview,
    dragFile,
    formData,
    startUpload,
    abortUpload,
  }
}

export default useFileDragAndDrop
