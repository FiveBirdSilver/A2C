'use client'
import Dropzone from 'react-dropzone'
import { MouseEvent, ChangeEvent, useEffect, useState } from 'react'
import { IoCamera } from 'react-icons/io5'

import Input from '@/components/ui/Input'
import Label from '@/components/ui/Label'
import { useBoardWriteMutation } from '@/hooks/mutations/useBoardWriteMutation.tsx'
import Button from '@/components/ui/Button'
import useFileDragAndDrop from '@/hooks/common/useFileDragAndDrop.tsx'
import Select from '@/components/ui/Select'
import { toastError } from '@/libs/utils/toast.ts'
import typeItems from '@/constants/boardTypeItems.json'
import { IMapList } from '@/types'

const PostWriteClient = ({ data }: { data: IMapList[] }) => {
  console.log(data)
  // 제목
  const [title, setTitle] = useState<string>('')

  // 내용
  const [content, setContent] = useState<string>('')

  // 카테고리
  const [category, setCategory] = useState<string>('find')

  // 장소
  const [place, setPlace] = useState<{ label: string; value: string }>()

  // 이미지 드래그드랍 훅
  const {
    uploadOriginImages,
    imageForGCSCheck,
    imageStorageUrl,
    imagesForPreview,
    dragFile,
  } = useFileDragAndDrop()

  // 게시글 생성 훅
  const { postGcsUploadImage, postGcsCheck, postBoard } =
    useBoardWriteMutation()

  // 클라이밍 ㄱㄴㄷ 순으로 재 정렬
  const sortedPlaces = data.sort((a, b) => a.name.localeCompare(b.name))

  const places = sortedPlaces.map((place) => ({
    value: place.lat + ',' + place.lng,
    label: place.name,
  }))

  // 게시글 생성 훅 실행
  const handleOnPostBoardAction = (images: { images: string[] | null }) => {
    postBoard.mutate({
      title,
      content,
      images: images.images ?? [],
      type: 'climbing',
      location: place
        ? {
            point: place?.label,
            lat: Number(place?.value.split(',')[0]),
            lng: Number(place?.value.split(',')[1]),
          }
        : null,
      contentType: category === 'community' ? 'community' : 'deal',
      price: 0,
      priceType: category !== 'community' ? category : '',
    })
  }

  // 작성 완료 클릭 이벤트
  const handleOnInsertBoard = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    // 유효성 검사
    if (!title || !content || (category !== 'community' && !place)) {
      toastError('모든 항목을 입력해주세요')
      return
    }

    if (imagesForPreview.length === 0) {
      handleOnPostBoardAction({ images: null })
      return
    }

    const uploadData = imageStorageUrl.map((url, index) => ({
      url: url,
      file: uploadOriginImages ? uploadOriginImages[index] : null,
    }))

    postGcsUploadImage.mutate(
      { data: uploadData },
      {
        onSuccess: () => {
          postGcsCheck.mutate(imageForGCSCheck!, {
            onSuccess: (res) => {
              handleOnPostBoardAction({ images: Object.values(res.exists) })
            },
          })
        },
      }
    )
  }

  // 카테고리 => '궁금해요'일 경우 위치 초기화
  useEffect(() => {
    if (category === 'community') setPlace({ label: '', value: '' })
  }, [category])

  return (
    <div className='p-4'>
      <form className='w-full flex flex-col space-y-6'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='description' className='block text-sm'>
            카테고리
          </label>
          <div className='flex items-center space-x-2'>
            {typeItems.map((item) => (
              <Label
                key={item.value}
                value={item.value}
                variant={category === item.value ? 'active' : 'inactive'}
                setValue={setCategory}
              >
                {item.text}
              </Label>
            ))}
          </div>
        </div>
        <Input
          label='제목'
          id='title'
          type='text'
          direction={'column'}
          variant={'default'}
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder='제목을 입력해주세요'
        />

        <div className='flex flex-col space-y-2'>
          <label htmlFor='description' className='block text-sm'>
            내용
          </label>
          <textarea
            id='contents'
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            placeholder='내용을 작성해주세요.'
            className='w-full text-sm outline-none text-gray-800 px-3 py-2 rounded border border-gray-200 placeholder-gray-500 h-28 resize-none'
          />
        </div>

        {/*이미지 업로드*/}
        <div className='flex items-center space-x-4'>
          <Dropzone
            onDrop={(acceptedFiles) =>
              dragFile(
                acceptedFiles,
                'life/upload',
                category === 'community' ? 'community' : 'deal'
              )
            }
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className='min-w-20 h-20 md:w-32 md:h-32 bg-white border-gray-200 border rounded flex items-center justify-center text-gray-500 text-xs flex-col gap-3 cursor-pointer'
              >
                <input {...getInputProps()} accept={'image/*'} />
                <IoCamera className={'text-2xl'} />
                <span className={'hidden text-xs md:flex'}>
                  사진을 끌어다 놓으세요
                </span>
                <div className={'hidden mt-2 md:flex'}>
                  <span></span>
                  <Button
                    variant={'outline'}
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                    size='sm'
                  >
                    PC에서 불러오기
                  </Button>
                </div>
              </div>
            )}
          </Dropzone>
          {/*이미지 업로드 개수*/}
          <div className='flex items-start justify-center flex-col gap-1 md:gap-2'>
            <p className='text-gray-400 pl-1 text-xs'>
              {imagesForPreview?.length ?? 0} / 5
            </p>
            {/* 미리보기 이미지 */}
            <div className='overflow-x-auto gap-2 flex'>
              {imagesForPreview.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`preview-${index}`}
                  className='w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg'
                />
              ))}
            </div>
          </div>
        </div>

        {/*클라이밍장 위치 등록*/}
        {category !== 'community' && (
          <div className='flex flex-col space-y-2 bg-white text-gray-800'>
            <div className='flex justify-between items-center'>
              <label className='text-sm'>클라이밍장 위치 등록</label>
              <button className='text-gray-500 text-xs'>삭제</button>
            </div>
            <Select
              options={places}
              value={place}
              setValue={setPlace}
              placeholder={'장소를 선택해주세요.'}
              title='장소선택'
              isLoading={!data}
            />
          </div>
        )}

        <button
          type='submit'
          className='w-full bg-green-400 text-white text-sm py-2 mt-4 rounded'
          onClick={(e) => handleOnInsertBoard(e)}
        >
          작성 완료
        </button>
      </form>
    </div>
  )
}
export default PostWriteClient
