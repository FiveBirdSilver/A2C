'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface IAccount {
  result: string
  data: {
    _id: string
    email: string
    nickname: string
  }
}
const MyPageProfileClient = (data: { data: IAccount }) => {
  const router = useRouter()
  const [nickname, setNickname] = useState<string>(
    data.data?.data?.nickname || ''
  )

  return (
    <main className='flex-1'>
      {/* 프로필 사진 */}
      <section className=''>
        <h2 className='text-base text-gray-900'>프로필 사진</h2>
        <div className='mt-3 flex items-center space-x-2'>
          <Image
            src={'/icons/user.webp'}
            alt={'profile'}
            priority
            width={40}
            height={40}
            onClick={() => router.push('/user/mypage/profile')}
            className='cursor-pointer'
          />
        </div>
      </section>

      {/* 기본 정보 */}
      <section className='mt-6 pt-6 border-t border-gray-100'>
        <h2 className='text-base s text-gray-900'>기본 정보</h2>
        <div className='mt-4 space-y-4'>
          <Input
            label='이메일'
            type='email'
            id='email'
            direction={'column'}
            variant={'default'}
            placeholder='이메일을 입력해주세요'
            disabled={true}
            value={data.data?.data?.email || ''}
          />
          <Input
            label='닉네임'
            type='nickname'
            id='nickname'
            direction={'column'}
            variant={'default'}
            placeholder='닉네임을 입력해주세요'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Input
            label='클라이밍 활동 기간'
            type='career'
            id='career'
            direction={'column'}
            variant={'default'}
            placeholder='클라이밍 활동 기간을 입력해주세요'
            // value={email}
            // onChange={(e) => handleOnChange(e)}
          />
        </div>
      </section>
      <div className='mt-6 flex justify-end space-x-4 text-sm h-8'>
        <Button variant={'outline'} onClick={() => {}}>
          취소
        </Button>
        <Button variant={'primary'} onClick={() => {}}>
          저장
        </Button>
      </div>
    </main>
  )
}
export default MyPageProfileClient
