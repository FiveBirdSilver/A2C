// Hydrate => QueryClient의 request-scoped 싱글톤 인스턴스
// 이렇게 하면 서로 다른 사용자 요청 간에 데이터가 공유되지 않고 요청당 한 번만 쿼리 클라이언트를 만들 수 있음

import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
