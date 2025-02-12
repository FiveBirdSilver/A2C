import axios, { AxiosInstance } from 'axios'

// POST, PUT, DELETE 요청을 위한 Axios 인스턴스
export const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})
