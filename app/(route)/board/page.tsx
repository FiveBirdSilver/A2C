'use client'

import { useState } from 'react'
import { Separator } from '@chakra-ui/react'
import Segmented from '@/components/elements/Segmented.tsx'
import Card from '@/components/elements/Card.tsx'

const Page = () => {
  const [checkedOption, setCheckedOption] = useState<string>('전체')
  return (
    <div className='flex justify-center w-full h-full py-4'>
      <div className='flex flex-col items-center w-full'>
        <Segmented
          items={['전체', '구해요', '같이해요', '공유해요']}
          value={checkedOption}
          setState={setCheckedOption}
        />
        <div className='flex flex-col pt-4 w-full'>
          <Card />
          <Separator className='border-gray-100 border-[0.5px]' />
        </div>
      </div>
    </div>
  )
}
export default Page
