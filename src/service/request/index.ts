import axios from 'axios'

import type { AxiosInstance } from 'axios'
// loading
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

// 类型
import type { IPRequestInterceptors, IPRequestConfig } from './type'

const DEFAULT_LOADING = true
class PRequest {
  instance: AxiosInstance
  interceptors: IPRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: IPRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    // 对原本的AxiosRequestConfig进行了扩展
    this.interceptors = config.interceptors || {}
    // config.showLoading如果为undefined或者null会返回true
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 使用拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求',
            background: 'rgba(0,0,0,.5)'
          })
        }

        // console.log('所有的实例都有拦截器: 请求拦截成功')
        return config
      },
      (err) => {
        // console.log('所有的实例都有拦截器: 请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有拦截器: 响应拦截成功')
        // 将loading移除
        if (this.showLoading) {
          this.loading?.close()
        }
        return res.data
      },
      (err) => {
        // console.log('所有的实例都有拦截器: 响应拦截失败')
        if (this.showLoading) {
          this.loading?.close()
        }
        return err
      }
    )
  }

  request<T>(config: IPRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对config的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 2.将showLoading设置tre，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置tre，这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: IPRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: IPRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T>(config: IPRequestConfig) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T>(config: IPRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default PRequest
