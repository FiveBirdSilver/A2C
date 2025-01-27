'use client'

import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { useMemo } from 'react'
import Loading from '@/app/loading.tsx'
import { useRouter } from 'next/navigation'

interface IAccount {
  email: string
  nickname: string
}
export default function Page() {
  const router = useRouter()
  const { data, isLoading, isSuccess, isError } = useQueries<{
    data: IAccount
  }>({
    queryKey: `myAccount`,
    endpoint: `/node/api/account`,
  })

  const renderMyAccount = useMemo(() => {
    if (isLoading) return <Loading />
    if (isError) {
      router.prefetch('/login')
      router.push('/login')
    }
    if (isSuccess) return <div>이메일 : {data.data.email}</div>
  }, [data, isLoading, isSuccess, isError])
  return <>{renderMyAccount}</>
}
