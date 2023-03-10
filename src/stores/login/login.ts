import { defineStore } from 'pinia'
// 路由
import router from '@/router'
// 本地缓存
import localCache from '@/utils/cache'
// 用户模块接口
import {
  accountLoginRequest,
  requestUserInfoById,
  reqUserMenuByRoleId
} from '@/api/login/login'

import useCommon from '../common'

// 用户类型的接口
import { IAccount } from '@/api/login/types'
// 登录类型的接口
import { ILoginState } from './types'
// 消息组件
import { ElMessage } from 'element-plus'
// 生成动态路由
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map.menus'
const useLogin = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    // 用户信息
    userInfo: {},
    // 侧边栏数据
    userMenus: {},
    // 所有的权限
    permissions: []
  }),

  getters: {},

  actions: {
    // 用户登录
    async accountLoginAsync(payload: IAccount) {
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data

      const commonStore = useCommon()
      localCache.setCache('token', token)
      if (token) {
        this.token = token
        commonStore.getInitialDataAsync({
          offset: 0,
          size: 10
        })

        // 获取某个用户信息
        const users = await requestUserInfoById(id)
        this.userInfo = users.data
        ElMessage({
          message: '登录成功',
          type: 'success'
        })

        // 获取侧边栏数据(用户所拥有的权限)  这里是获取用户的权限id，不是用户id
        const menu = await reqUserMenuByRoleId(this.userInfo.role.id)
        this.userMenus = menu.data

        localCache.setCache('menus', menu.data)

        // 获取用户的动态路由
        this.getsMenus(menu.data)
        // 跳转到首页
        router.push('/main')
      }
    },
    // 本地加载
    // 刷新页面都会执行这个方法
    loadLocalLogin() {
      const token = localCache.getCache('token')
      const commonStore = useCommon()
      if (token) {
        this.token = token
        // 获取部门管理/角色管理的数据
        commonStore.getInitialDataAsync({
          offset: 0,
          size: 10
        })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      // const userMenus = localCache.getCache('menu')
      // const userMenus = JSON.parse(JSON.stringify(this.userMenus))
      if (localCache.getCache('menus')) {
        const userMenus = localCache.getCache('menus')
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => {
          router.addRoute('main', route)
        })
      } else {
        router.push('/login')
      }
    },
    // 计算动态路由数据
    getsMenus(menus: any) {
      this.userMenus = menus
      const routes = mapMenusToRoutes(menus)
      // 将routes -> router.main.children
      // 注册路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 收集所有的按钮权限
      const permissions = mapMenusToPermissions(this.userMenus)
      this.permissions = permissions
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useLogin
