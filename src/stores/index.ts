import { createPinia } from 'pinia'

// pinia数据持久化存储
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()

pinia.use(piniaPluginPersist)

export default pinia
