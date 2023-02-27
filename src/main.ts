import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入pinia
import pinia from './stores'
// 初始化Css样式
import 'normalize.css'
import '@/assets/css/index.less'
// 全局引入 elementplus组件库
// import ElementPlus from 'element-plus'

// elementplus组件库 样式
import 'element-plus/dist/index.css'

// 按需加载组件
import { globalRegister } from '@/global/index'
import useLogin from './stores/login/login'

// 全局注册组件
import PageContent from './components/page-content/src/page-content.vue'

// element-plus/dist/locale/zh-cn.mjs
const app = createApp(App)
// 优雅的局部引入
app.use(globalRegister)
// 挂载vuex状态管理
app.use(pinia)
const loginStore = useLogin()
loginStore.loadLocalLogin()

app.component('PageContent', PageContent)
// 挂载路由
app.use(router)

app.mount('#app')
