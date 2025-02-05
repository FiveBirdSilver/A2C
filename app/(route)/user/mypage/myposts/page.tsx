'use client'

import { Suspense } from 'react'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
import Loading from '@/app/loading.tsx'
// import BoardListClient from '@/components/clients/BoardListClient.tsx'
import Image from 'next/image'

// interface IAccount {
//   result: string
//   data: {
//     email: string
//     nickname: string
//   }
// }

// async function fetchMyPage(sessionId?: { name: string; value: string }) {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/node/api/account`
//   const res = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       Cookie: `${sessionId?.name}=${sessionId?.value}`,
//     },
//     credentials: 'include',
//   })
//
//   return res.json()
// }

export default function Page() {
  // const cookieStore = await cookies()
  // const sessionId = cookieStore.get('connect.sid')
  // const data: IAccount = await fetchMyPage(sessionId)
  // if (data.result === 'fail') {
  //   redirect('/login')
  // }

  // if (data.data === null) {
  //   return <div>작성된 게시글이 없습니다.</div>
  // }

  return (
    <Suspense fallback={<Loading />}>
      {/*<BoardListClient initialData={[]} />*/}
      <div className={'flex flex-col justify-center items-center p-6 gap-4'}>
        <Image src={`/icons/paper.webp`} alt={'error'} width={70} height={30} />
        <p className={'text-base'}>아직 작성한 글이 없어요</p>
      </div>
    </Suspense>
  )
}
