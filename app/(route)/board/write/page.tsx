'use client'

import { ChangeEvent, useState } from 'react'
import Input from '@/components/elements/Input.tsx'

const Page = () => {
  const [title, setTitle] = useState<string>('')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <div className='p-4 text-gray-900 bg-white min-h-screen'>
      <header className='flex items-center justify-center mb-4'>
        <h1 className='text-lg font-semibold text-gray-800'>게시글 작성</h1>
      </header>

      <form className='w-full flex flex-col gap-6'>
        <div className='flex items-center space-x-4'>
          <div className='w-16 h-16 bg-white border-gray-200 border rounded flex items-center justify-center text-gray-500'>
            📷
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
          onChange={(e) => handleOnChange(e)}
          placeholder='제목을 입력해주세요'
        />
        <div className='flex flex-col gap-3'>
          <div className='flex items-center space-x-2'>
            <button
              type='button'
              className='text-xs px-4 py-2 text-gray-500 text-black rounded-full border border-green-400'
            >
              구해요
            </button>
            <button
              type='button'
              className='text-xs px-4 py-2 bg-green-400 text-white rounded-full'
            >
              같이해요
            </button>
            <button
              type='button'
              className='text-xs px-4 py-2 text-gray-500  rounded-full border border-green-400'
            >
              공유해요
            </button>
          </div>
          <Input
            label=''
            id='title'
            type='text'
            direction={'column'}
            variant={'default'}
            value={title}
            onChange={(e) => handleOnChange(e)}
            placeholder='₩ 가격을 입력해주세요.'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='description' className='block text-sm mb-1'>
            내용
          </label>
          <textarea
            id='description'
            placeholder='내용을 작성해주세요.'
            className='w-full text-sm outline-none text-gray-800 px-4 py-2 rounded border border-gray-200 placeholder-gray-500 h-28'
          ></textarea>
        </div>

        <div className='bg-white text-gray-800'>
          <div className='flex justify-between items-center mb-2'>
            <label className='text-sm font-semibold'>
              클라이밍장 위치 등록
            </label>
            <button className='text-gray-500 text-xs'>삭제</button>
          </div>
          <div className='flex items-center justify-between bg-white px-4 py-2 rounded border border-gray-200'>
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
