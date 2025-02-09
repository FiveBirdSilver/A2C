import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  withCredentials: true,
})

export { instance }
