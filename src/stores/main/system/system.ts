import { defineStore } from 'pinia'

// 请求接口
import { reqPageListData } from '@/api/main/system/system'
// useSystem 中的类型
import { ISystemState } from './types'
const useSystem = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0
  }),
  getters: {
    // 根据提供的pageName，来return 不同的数据
    pageListData() {
      return (pageName: string) => {
        console.log(pageName, '==')
        // 第一种方式
        // return (this as any)[`${pageName}List`]
        // 第二种方式
        switch (pageName) {
          case 'users':
            return this.usersList
          case 'role':
            return this.roleList
          default:
            break
        }
      }
    }
  },
  actions: {
    // 获取数据
    async getPageListAsync(payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const opt = payload.queryInfo
      // 第一种方式: 拼接路径
      const pageUrl = pageName + '/list'

      // 第二种方式
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = 'users/list'
      //     break
      //   case 'role':
      //     pageUrl = 'role/list'
      //     break
      //   default:
      //     break
      // }

      // 2.对页面进行发请求
      const res = await reqPageListData(pageUrl, opt)
      const { list, totalCount } = res.data
      // 3.将数据存储到state中
      if (list.length > 0) {
        // 第一种方式
        switch (pageName) {
          case 'users':
            this.usersList = list
            this.usersCount = totalCount
            return this.usersList
          case 'role':
            this.roleList = list
            this.roleCount = totalCount
            return this.roleList

          default:
            break
        }
      }
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useSystem
