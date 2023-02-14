import axios from 'axios'

// 全局配置选项
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000
// axios
// .get('/get', {
//   params: {
//     name: 'who',
//     age: 19
//   },
//   timeout: 5000
// })
// .then((res) => {
//   console.log(res)
// })

// axios.all -> 多个请求，一起返回
axios
  .all([
    axios.get('/get', {
      params: {
        name: 'who',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'who',
        age: 18
      }
    })
  ])
  .then((res) => {
    console.log(res)
  })

// axios拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('请求成功的拦截')
    return config
  },
  (err) => {
    console.log('请求发送错误')
    return err
  }
)

axios.interceptors.response.use(
  (res) => {
    console.log('响应成功的拦截')
    return res.data
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)
