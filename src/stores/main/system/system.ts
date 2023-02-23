import { defineStore } from 'pinia'

// 请求接口
import { reqPageListData } from '@/api/main/system/system'
// useSystem 中的类型
import { ISystemState } from './types'
const useSystem = defineStore('system', {
  state: (): ISystemState => ({
    // 用户管理
    usersList: [],
    usersCount: 0,
    // 角色管理
    roleList: [],
    roleCount: 0,
    // 商品管理
    goodsList: [],
    goodsCount: 0,
    // 菜单管理
    menusList: [],
    menusCount: 0,
    // 部门管理
    departmentList: [],
    departmentCount: 0
  }),
  getters: {
    // 根据提供的pageName，来return 不同的数据
    pageListData() {
      return (pageName: string) => {
        // 第一种方式
        // return (this as any)[`${pageName}List`]
        // 第二种方式
        switch (pageName) {
          case 'users':
            return this.usersList
          case 'role':
            return this.roleList
          case 'goods':
            return this.goodsList
          case 'menu':
            return this.menusList
          case 'department':
            return this.departmentList
          default:
            break
        }
      }
    },
    pageListCount() {
      return (pageName: string) => {
        return (this as any)[`${pageName}Count`]
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
            return {
              list: this.usersList,
              count: this.usersCount
            }
          case 'role':
            this.roleList = list
            this.roleCount = totalCount
            return {
              list: this.roleList,
              count: this.roleCount
            }
          case 'goods':
            this.goodsList = list
            this.goodsCount = totalCount
            return {
              list: this.goodsList,
              count: this.goodsCount
            }
          case 'menu':
            this.menusList = list
            this.menusCount = totalCount
            return {
              list: this.menusList,
              count: this.menusCount
            }
          case 'department':
            this.departmentList = list
            this.departmentCount = totalCount
            return {
              list: this.departmentList,
              count: this.departmentCount
            }
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
