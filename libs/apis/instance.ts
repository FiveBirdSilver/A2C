import axios, { AxiosInstance } from 'axios'

// POST, PUT, DELETE 요청을 위한 Axios 인스턴스
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

// GET 요청을 위한 Axios 인스턴스
const apiFetcher: AxiosInstance = axios.create({
  baseURL: '/backend',
  withCredentials: true,
})

export { apiClient, apiFetcher }
