import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: '/route',
  withCredentials: true,
})

export { instance }
