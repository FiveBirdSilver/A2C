import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_NODE_URL,
  withCredentials: true,
})

const mapInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PHYTHON_URL,
  withCredentials: true,
})

export { instance, mapInstance }
