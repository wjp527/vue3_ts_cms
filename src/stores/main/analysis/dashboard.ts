import { defineStore } from 'pinia'

import {
  getAmountList,
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/api/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from '../../common/type'
const useDashboard = defineStore('dashboard', {
  state: (): IDashboardState => ({
    // 顶部的数据
    topPanelData: [],
    // 分类商品数量
    categoryGoodsCount: [],
    // 不同城市商品销量
    categoryGoodsSale: [],
    // 分类商品数量
    categoryGoodsFavor: [],
    // 不同分类的销量
    addressGoodsSale: []
  }),

  getters: {},

  actions: {
    async getAnalysisDataAcsync() {
      const res = await getAmountList()
      this.topPanelData = res.data
    },

    async CategoryGoodsCount() {
      const res = await getCategoryGoodsCount()
      this.categoryGoodsCount = res.data
    },

    async CategoryGoodsSale() {
      const res = await getCategoryGoodsSale()
      this.categoryGoodsSale = res.data
    },

    async CategoryGoodsFavor() {
      const res = await getCategoryGoodsFavor()
      this.categoryGoodsFavor = res.data
    },

    async AddressGoodsSale() {
      const res = await getAddressGoodsSale()
      this.addressGoodsSale = res.data
    }
  }
})

export default useDashboard
