// service统一出口
import PRequest from './request'

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
      const token = 'xxx'
      if (token) {
        config.headers.Authorization = token
      }
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch(error) {
      console.log('请求失败的拦截')
      return error
    },
    responseInterceptor(res) {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch(err) {
      console.log('响应失败的拦截')
      return err
    }
  }
})
export default pRequest
