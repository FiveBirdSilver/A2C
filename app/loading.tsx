'use client'

import dynamic from 'next/dynamic'
import loadingAnimation from '@/public/lottie/loading.json'
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false })

export default function Loading() {
  return (
    <div className='grid h-full w-full place-items-center rounded-lg p-6 lg:overflow-visible'>
      <Lottie
        loop
        animationData={loadingAnimation}
        play
        style={{ width: 48, height: 48 }}
      />
    </div>
  )
}
