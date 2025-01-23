'use client'

import { MdError } from 'react-icons/md'

export default function Error({ message }: { message: string }) {
  return (
    <div className='h-full text-center flex flex-col gap-4 items-center justify-center'>
      <MdError className='text-red-500 text-5xl' />
      <h6 className='text-xl'>문제가 발생했습니다</h6>
      <p className='text-sm'>
        {message}
        <br />
        잠시 후 다시 시도해 주세요
      </p>
    </div>
  )
}
