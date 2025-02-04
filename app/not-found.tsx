'use client'

import Image from 'next/image'
import Button from '@/components/elements/Button.tsx'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className='h-full text-center flex flex-col gap-4 items-center justify-center'>
      <Image src={`/icons/404.webp`} alt={'error'} width={120} height={50} />
      <h6 className='text-xl font-semibold text-gray-700'>
        페이지를 찾을 수 없습니다
      </h6>
      <p className='text-base text-gray-700'>
        일시적으로 사용할 수 없거나 더 이상 존재하지 않는 페이지예요
      </p>
      <div className={'grid h-10 w-4/12 mt-8 text-sm'}>
        <Button
          text={'홈으로 돌아가기'}
          variant={'primary'}
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  )
}
