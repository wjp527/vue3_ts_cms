import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器
export interface IPRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptor?: (config: any) => any
  requestInterceptorCatch?: (error: any) => any
  // 响应拦截
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 扩展类型
export interface IPRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IPRequestInterceptors<T>
  showLoading?: boolean
}
