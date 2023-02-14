import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入 elementplus组件库
// import ElementPlus from 'element-plus'

// elementplus组件库 样式
import 'element-plus/dist/index.css'

// import '@/service/axios_demo'
// 按需加载组件
import { globalRegister } from '@/global/index'

// 引入请求
import pRequest from '@/service'
const app = createApp(App)
// 挂载路由
app.use(router)
// 挂载vuex状态管理
app.use(store)
// 全局引入 elementplus组件库
// app.use(ElementPlus)
// 局部引入
// globalRegister(app)
// 优雅的局部引入
app.use(globalRegister)

// 获取环境变量
// console.log(process.env.VUE_APP_BASE_URL)

// pRequest.request({
//   url: '/home',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的res')
//       return res
//     }
//   }
// })

interface IDataType {
  data: object
  returnCode: string
  success: boolean
}

// pRequest
//   .request<IDataType>({
//     url: '/home',
//     method: 'GET',
//     showLoading: false
//   })
//   .then((res) => {
//     console.log(res)
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

pRequest
  .get<IDataType>({
    url: '/home'
    // showLoading: false
  })
  .then((res) => {
    console.log(res)
  })
app.mount('#app')
