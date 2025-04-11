import Link from 'next/link'
import { cookies } from 'next/headers'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { Suspense } from 'react'

import { IPostList } from '@/types'
import Loading from '@/app/loading.tsx'
import PostListClient from '@/components/clients/PostListClient.tsx'
import PostWriteActionClient from '@/components/clients/PostWriteActionClient.tsx'

// 초기데이터만 SSR 이후부터 CSR => 초기 렌더링 속도 및 SEO를 위함
async function fetchData({
  sessionId,
}: {
  sessionId: { name: string; value: string } | undefined
}): Promise<{ result: string; data: IPostList[] }> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/board?page=1&contentType=community`
  const cookieHeader = sessionId ? `${sessionId.name}=${sessionId.value}` : ''
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader && { Cookie: cookieHeader }),
    },
    credentials: 'include',
  })

  return res.json()
}

export default async function Page() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('connect.sid')

  // 카테고리 파라미터
  const data = await fetchData({ sessionId })

  return (
    <Suspense fallback={<Loading />}>
      <div className='grid gap-8 md:grid-cols-3 grid-cols-1 pt-6'>
        <main className='col-span-1 md:col-span-2'>
          <div
            className={`flex flex-col w-full gap-5 md:bg-white ${data.data.length > 0 ? 'bg-[#f8f9fa]' : 'bg-white'}`}
          >
            <PostListClient initialData={data.data} type={'community'} />
          </div>
        </main>
        <aside className='hidden md:flex flex-col md:col-span-1 h-screen sticky top-20 overflow-visible'>
          <div className={'flex flex-col gap-2'}></div>
          <div className={'flex flex-col gap-2'}>
            <PostWriteActionClient />
          </div>
        </aside>
        <Link
          className='fixed md:hidden bg-green-400 w-12 h-12 rounded-full flex items-center justify-center text-lg text-white bottom-12 right-4 cursor-pointer'
          href={'write?type=community'}
        >
          <HiOutlinePencilAlt />
        </Link>
      </div>
    </Suspense>
  )
}
