'use client'

import Image from 'next/image'
import Button from '@/components/elements/Button.tsx'
import { useRouter } from 'next/navigation'

export default function Error({ message }: { message: string }) {
  const router = useRouter()

  return (
    <div className='h-full text-center flex flex-col gap-4 items-center justify-center'>
      <Image src={`/icons/error.png`} alt={'error'} width={120} height={50} />
      <h6 className='text-xl font-semibold text-gray-700'>
        문제가 발생했습니다
      </h6>
      <p className='text-base text-gray-700'>
        {message}
        <br />
        잠시 후 다시 시도해 주세요
      </p>
      <div className={'grid h-10 min-w-60 w-4/12 mt-8 text-sm'}>
        <Button
          text={'홈으로 돌아가기'}
          variant={'primary'}
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  )
}
