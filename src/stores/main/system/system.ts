import { defineStore } from 'pinia'

// 请求接口
import { getPageListData } from '@/api/main/system/system'
// useSystem 中的类型
import { ISystemState } from './types'
const useSystem = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userCount: 0
  }),
  getters: {},
  actions: {
    // 获取数据
    async getPageListAsync(payload: any) {
      const res = await getPageListData(payload)
      const { list, totalCount } = res.data
      if (list.length > 0) {
        this.userList = list
        this.userCount = totalCount
      }
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useSystem
