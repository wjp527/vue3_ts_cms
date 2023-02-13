import { createStore } from 'vuex'

const store = createStore({
  // 数据
  state: () => {
    return {
      name: 'coderwho'
    }
  },
  // 同步
  mutations: {},
  // 异步
  getters: {},
  actions: {}
})

export default store
