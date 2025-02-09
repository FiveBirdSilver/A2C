import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: '/backend',
  withCredentials: true,
})

export { instance }
