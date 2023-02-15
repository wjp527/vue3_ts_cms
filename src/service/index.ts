// service统一出口
import PRequest from './request'

// 本地缓存
// import useLogin from '@/stores/login/login'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'
// 获取env中的常量
// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_TIME_OUT)
const BASEURL = process.env.VUE_APP_BASE_URL
const TIME_OUT = process.env.VUE_APP_TIME_OUT
const pRequest = new PRequest({
  baseURL: BASEURL,
  timeout: TIME_OUT,
  // 拦截处理
  interceptors: {
    requestInterceptor(config) {
      // 携带token拦截
      const token = localCache.getCache('token')
      console.log(token)
      if (token) {
        // 添加请求头
        config.headers.Authorization = token
      }

      return config
    },
    requestInterceptorCatch(error) {
      return error
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      ElMessage({
        message: 'error',
        type: 'error'
      })
      return err
    }
  }
})
export default pRequest
