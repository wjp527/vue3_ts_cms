import type { AxiosRequestConfig } from 'axios'

// 拦截器
export interface IPRequestInterceptors {
  // 请求拦截
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  // 响应拦截
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (err: any) => any
}

// 扩展类型
export interface IPRequestConfig extends AxiosRequestConfig {
  interceptors?: IPRequestInterceptors
  showLoading?: boolean
}
