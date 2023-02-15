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
const useLogin = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: {}
  }),

  getters: {},

  actions: {
    // 用户登录
    async accountLoginAsync(payload: IAccount) {
      const res = await accountLoginRequest(payload)
      const { id, token } = res.data
      console.log(token)
      localCache.setCache('token', token)
      if (token) {
        this.token = token

        // 获取某个用户信息
        const users = await requestUserInfoById(id)
        this.userInfo = users.data
        // 获取侧边栏全部数据
        const menu = await reqUserMenuByRoleId(id)
        this.userMenus = menu.data
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        // 跳转到首页
        router.push('/main')
      }
    }
  },

  // 开启数据缓存
  persist: {
    enabled: true
  }
})

export default useLogin
