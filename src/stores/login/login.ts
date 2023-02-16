import { defineStore } from 'pinia'
// 路由
import router from '@/router'

import localCache from '@/utils/cache'
// 用户模块
import {
  accountLoginRequest,
  requestUserInfoById,
  reqUserMenuByRoleId
} from '@/api/user/login'

// 用户类型的接口
import { IAccount, IDataType } from '@/api/user/types'
// 登录类型的接口
import { ILoginState } from './types'
import { ElMessage } from 'element-plus'
import { mapMenusToRoutes } from '@/utils/map.menus'
const useLogin = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: {}
  }),

  getters: {
    // 计算动态路由数据
    getsMenus() {
      const routes = mapMenusToRoutes(this.userMenus)
      console.log(routes)
      // 将routes -> router.main.children
      // 注册路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },

  actions: {
    // 用户登录
    async accountLoginAsync(payload: IAccount) {
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data

      localCache.setCache('token', token)
      if (token) {
        this.token = token
        this.getUserInfo(id)

        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        // 跳转到首页
        router.push('/main')
      }
    },
    async getUserInfo(id: number) {
      // 获取某个用户信息
      const users = await requestUserInfoById(id)
      this.userInfo = users.data
      this.getMenu(id)
    },
    async getMenu(id: number) {
      // 获取侧边栏全部数据
      const menu = await reqUserMenuByRoleId(id)
      this.userMenus = menu.data
      // userMenus -> routes
      // 获取用户的动态路由
      this.getsMenus
    },
    loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.token = token
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      const userMenus = JSON.parse(JSON.stringify(this.userMenus))
      if (userMenus) {
        // userMenus -> routes
        // 获取用户的动态路由
        this.getsMenus
      }
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useLogin
