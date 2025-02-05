'use client'

import { ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import { StylesConfig } from 'react-select'

import { IoCamera } from 'react-icons/io5'
import Input from '@/components/elements/Input'
import Label from '@/components/elements/Label'
import { IMapList } from '@/hooks/common/useMap'

// 타입 정의
interface TypeItem {
  text: string
  value: string
}

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
  const [title, setTitle] = useState<string>('')
  const [contents, setContents] = useState<string>('')
  const [type, setType] = useState<string>('find')

  const typeItems: TypeItem[] = [
    { text: '구해요', value: 'find' },
    { text: '같이해요', value: 'together' },
    { text: '궁금해요', value: 'community' },
  ]

  const sortedPlaces = data.sort((a, b) => a.name.localeCompare(b.name))

  const places = sortedPlaces.map((place) => ({
    value: place.id,
    label: place.name,
  }))

  return (
    <div className='pt-4 px-4'>
      <form className='w-full flex flex-col gap-6 '>
        <div>
          <label htmlFor='description' className='block text-sm mb-1'>
            카테고리
          </label>
          <div className='flex items-center space-x-2'>
            {typeItems.map((item) => (
              <Label
                key={item.value}
                text={item.text}
                value={item.value}
                type={type === item.value ? 'active' : 'inactive'}
                setValue={setType}
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

        <div>
          <label htmlFor='description' className='block text-sm mb-1'>
            내용
          </label>
          <textarea
            id='contents'
            value={contents}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContents(e.target.value)
            }
            placeholder='내용을 작성해주세요.'
            className='w-full text-sm outline-none text-gray-800 px-3 py-2 rounded border border-gray-200 placeholder-gray-500 h-28 resize-none'
          />
        </div>
        <div className='flex items-center space-x-4'>
          <div className='w-16 h-16 bg-white border-gray-200 border rounded flex items-center justify-center text-gray-500'>
            <IoCamera />
          </div>
          <p className='text-gray-400'>0/10</p>
        </div>
        <div className='bg-white text-gray-800'>
          <div className='flex justify-between items-center mb-2'>
            <label className='text-sm font-semibold'>
              클라이밍장 위치 등록
            </label>
            <button className='text-gray-500 text-xs'>삭제</button>
          </div>

          <Select
            options={places}
            styles={customStyles}
            placeholder={'장소를 선택해주세요.'}
          />
        </div>
        <button
          type='submit'
          className='w-full bg-green-400 text-white text-sm py-2 mt-4 rounded font-semibold'
        >
          작성 완료
        </button>
      </form>
    </div>
  )
}
export default BoardWriteClient
