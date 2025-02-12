'use client'

import Image from 'next/image'
import Button from '@/components/elements/Button.tsx'
import { useRouter } from 'next/navigation'

export default function Error({ message }: { message: string }) {
  const router = useRouter()

  return (
    <div className='h-full text-center flex flex-col space-y-6 items-center justify-center'>
      <Image src={`/icons/error.webp`} alt={'error'} width={120} height={50} />
      <h6 className='text-lg text-gray-700'>문제가 발생했습니다</h6>
      <span className='text-sm text-gray-700'>
        {message ? message : '일시적인 오류가 발생했습니다'}
        <br />
        잠시 후 다시 시도해 주세요
      </span>
      <div className={'grid h-10 min-w-60 w-4/12 text-sm'}>
        <Button
          text={'홈으로 돌아가기'}
          variant={'primary'}
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  )
}
