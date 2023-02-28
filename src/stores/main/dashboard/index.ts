import { defineStore } from 'pinia'

// getAmountList
import { getAmountList } from '@/api/main/system/system'
const useDashboard = defineStore('dashboard', {
  state: () => ({
    // 顶部的数据
    topPanelDatas: []
  }),

  getters: {},

  actions: {
    async getAnalysisDataAcsync() {
      const res = await getAmountList()
      this.topPanelDatas = res.data
    }
  }
})

export default useDashboard
