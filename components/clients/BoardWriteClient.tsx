'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import toast from 'react-hot-toast'
import { StylesConfig } from 'react-select'
import { IoCamera } from 'react-icons/io5'

import Input from '@/components/elements/Input'
import Label from '@/components/elements/Label'
import { IMapList } from '@/hooks/common/useMap'
import { useBoardWriteMutation } from '@/hooks/mutations/useBoardWriteMutation.tsx'

// 카테고리 타입 정의
interface TypeItem {
  text: string
  value: string
}

// 셀렉트 박스 타입 정의
interface SelectOption {
  label: string
  value: string
}

// 셀렉트박스 스타일 커스텀
const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0.375rem',
    borderColor: '#dcdcdc',
    fontSize: '0.875rem',
    boxShadow: 'none !important',
    '&:hover': {
      boxShadow: 'none !important', // hover 시 outline 변경
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    fontSize: '0.875rem',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? undefined
      : isSelected
        ? '#bae0c2'
        : isFocused
          ? '#f0f9f2'
          : undefined,
    color: '#525252',
    cursor: isDisabled ? 'not-allowed' : 'default',

    ':active': {
      ...styles[':active'],
      backgroundColor: !isDisabled
        ? isSelected
          ? '#bae0c2' // 클릭 시 선택된 상태의 색상
          : '#f0f9f2' // 비선택 상태의 클릭 색상
        : undefined,
    },
  }),
}
const Select = dynamic(() => import('react-select'), { ssr: false })

const BoardWriteClient = ({ data }: { data: IMapList[] }) => {
  // 제목
  const [title, setTitle] = useState<string>('')

  // 내용
  const [content, setContent] = useState<string>('')

  // 카테고리
  const [category, setCategory] = useState<string>('find')

  // 장소
  const [place, setPlace] = useState<{ label: string; value: string } | null>()

  // 이미지
  // const [images, setImages] = useState<string[]>([])

  const { postBoard } = useBoardWriteMutation()

  const typeItems: TypeItem[] = [
    { text: '구해요', value: 'find' },
    { text: '같이해요', value: 'together' },
    { text: '궁금해요', value: 'community' },
  ]

  const sortedPlaces = data.sort((a, b) => a.name.localeCompare(b.name))

  const places = sortedPlaces.map((place) => ({
    value: place.lat + ',' + place.lng,
    label: place.name,
  }))

  const handleOnInsertBoard = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()

    // 유효성 검사
    if (!title || !content || (category !== 'community' && !place)) {
      toast.dismiss()
      toast.error('모든 항목을 입력해주세요')

      return
    }

    // 게시글 생성 hook
    postBoard.mutate({
      title,
      content,
      images: [],
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

  // 카테고리 => '궁금해요'일 경우 위치 초기화
  useEffect(() => {
    if (category === 'community') setPlace(null)
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
                text={item.text}
                value={item.value}
                type={category === item.value ? 'active' : 'inactive'}
                setValue={setCategory}
              />
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
          <div className='w-16 h-16 bg-white border-gray-200 border rounded flex items-center justify-center text-gray-500'>
            <IoCamera />
          </div>
          <p className='text-gray-400'>0/10</p>
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
              styles={customStyles}
              placeholder={'장소를 선택해주세요.'}
              onChange={(newValue) => {
                if (!newValue) return
                setPlace(newValue as SelectOption)
              }}
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
export default BoardWriteClient
