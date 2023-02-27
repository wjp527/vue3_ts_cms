import { defineStore } from 'pinia'

import { IRootState } from './type'
import useSystem from '../main/system/system'
import {
  reqGets,
  reqGetDepartment,
  reqGetRole,
  reqCreatePageData,
  reqEditPageData
} from '@/api/common'
import { ElMessage } from 'element-plus'
const useCommon = defineStore('common', {
  state: (): IRootState => ({
    // 全部的部门
    entireDepartment: [],
    // 全部的角色
    entireRole: []
  }),

  getters: {},

  actions: {
    getinit(pageName: string) {
      reqGets(pageName)
    },
    // 初始化数据
    getInitialDataAsync(payload?: any) {
      // 部门数据
      reqGetDepartment('/department/list', payload).then((res) => {
        this.entireDepartment = res.data.list
      })
      reqGetRole('/role/list', payload).then((res) => {
        console.log(payload)
        this.entireRole = res.data.list
      })
    },

    async createPageDataAsync(payload: any) {
      // 1. 创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      // 2.请求最新数据
      const res = await reqCreatePageData(pageUrl, newData)
      if (res.code === 400) {
        ElMessage.error(res.data)
      } else {
        ElMessage.success(res.data)
      }

      const systemStore = useSystem()
      // setTimeout(() => {
      // 重新渲染数据
      systemStore.getPageListAsync({
        pageName: pageName,
        queryInfo: { offset: 0, size: 10 }
      })
      // }, 1000)
    },
    async EditPageDataAsync(payload: any) {
      // 1.编辑数据的请求
      const { pageName, id, editData } = payload
      const pageUrl = `/${pageName}/${id}`
      const res = await reqEditPageData(pageUrl, editData)
      if (res.code === 400) {
        ElMessage.error(res.data)
      } else {
        ElMessage.success(res.data)
      }
      this.getInitialDataAsync({ offset: 0, size: 10 })

      // 重新渲染数据
      const systemStore = useSystem()
      systemStore.getPageListAsync({
        pageName: pageName,
        queryInfo: { offset: 0, size: 10 }
      })
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useCommon
