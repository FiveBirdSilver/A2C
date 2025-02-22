'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import Loading from '@/app/loading.tsx'

export default function NoResult() {
  return (
    <Suspense fallback={<Loading />}>
      <div className={'flex flex-col justify-center items-center p-6 gap-4'}>
        <Image src={`/icons/paper.webp`} alt={'error'} width={70} height={30} />
        <p className={'text-base'}>아직 작성된 글이 없어요</p>
      </div>
    </Suspense>
  )
}
