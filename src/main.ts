import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
// 挂载路由
app.use(router)
// 挂载vuex状态管理
app.use(store)
app.mount('#app')
