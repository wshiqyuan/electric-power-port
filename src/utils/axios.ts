import axios, {type AxiosResponse, type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError} from "axios"
import { ElNotification } from "element-plus"

const service:AxiosInstance = axios.create({
  baseURL:"https://www.demo.com",
  timeout:5000
})

// 请求拦截器
service.interceptors.request.use((config:InternalAxiosRequestConfig) => {
  
  return config
},(err:AxiosError) => {
  ElNotification({
    title:'Error',
    message:err.message,
    type:'error'
  })
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use((response:AxiosResponse) => {
  console.log(response)
  return response
},(err:AxiosError) => {
  ElNotification({
    title:'Error',
    message:err.message,
    type:'error'
  })
  return Promise.reject(err)
})

export default service

