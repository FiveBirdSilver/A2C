'use client'

import Image from 'next/image'
import Link from 'next/link'

const PostWriteActionClient = () => {
  return (
    <>
      <div className='flex items-center gap-2'>
        <Image
          src={'/icons/highfive.webp'}
          width={20}
          height={20}
          alt={'highfive'}
        />
        <span className={'text-gray-700 text-sm'}>
          클라이밍 궁금증을 나누고 새 파트너를 만나보세요
        </span>
      </div>
      <Link href={'/life/write'}>
        <button className='flex items-center py-4 text-sm font-semibold text-green-500 bg-green-100 rounded-xl hover:bg-green-200 w-full justify-center '>
          글 작성
        </button>
      </Link>
    </>
  )
}
export default PostWriteActionClient
