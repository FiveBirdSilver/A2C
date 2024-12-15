'use client'

import { ChangeEvent, useState } from 'react'
import { IoCamera } from 'react-icons/io5'

import Input from '@/components/elements/Input.tsx'
import Label from '@/components/elements/Label.tsx'

const Page = () => {
  const [title, setTitle] = useState<string>('')
  const [contents, setContents] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [type, setType] = useState<string>('find')

  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })

  const typeItems = [
    { text: '구해요', value: 'find' },
    { text: '같이해요', value: 'together' },
    { text: '공유해요', value: 'share' },
  ]

  const handleOnChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numericValue = value.replace(/[^\d]/g, '')
    const formattedValue = Number(numericValue).toLocaleString('ko-KR')
    setPrice(formattedValue)
  }

  return (
    <div className='p-4 text-gray-900 bg-white md:px-40 min-h-screen'>
      <form className='w-full flex flex-col gap-6'>
        <div className='flex items-center space-x-4'>
          <div className='w-16 h-16 bg-white border-gray-200 border rounded flex items-center justify-center text-gray-500'>
            <IoCamera />
          </div>
          <p className='text-gray-400'>0/10</p>
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
        <div className='flex flex-col gap-3'>
          <div className='flex items-center space-x-2'>
            {typeItems.map((item, i) => (
              <Label
                key={item.value}
                text={item.text}
                value={item.value}
                type={type === item.value ? 'active' : 'inactive'}
                setValue={setType}
              />
            ))}
          </div>
          {type === 'find' && (
            <Input
              label=''
              id='title'
              type='text'
              direction={'column'}
              variant={'default'}
              value={price}
              onChange={handleOnChangePrice}
              placeholder='₩ 가격을 입력해주세요.'
            />
          )}
        </div>

        <div className='mb-4'>
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
            className='w-full text-sm outline-none text-gray-800 px-4 py-2 rounded border border-gray-200 placeholder-gray-500 h-28 resize-none'
          />
        </div>

        <div className='bg-white text-gray-800'>
          <div className='flex justify-between items-center mb-2'>
            <label className='text-sm font-semibold'>
              클라이밍장 위치 등록
            </label>
            <button className='text-gray-500 text-xs'>삭제</button>
          </div>
          <div
            className='flex items-center justify-between bg-white px-4 py-2 rounded border border-gray-200'
            onClick={() => {}}
          >
            <span className='text-sm'>클라이밍파크 신논현점</span>
            <button className='text-gray-500'>{'>'}</button>
          </div>
        </div>
        <button
          type='submit'
          className='w-full bg-green-400 text-white py-2 rounded font-semibold'
        >
          작성 완료
        </button>
      </form>
    </div>
  )
}
export default Page
