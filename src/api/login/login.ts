import pRequest from '@/service'
import { IAccount } from './types'
import { IDataType } from '@/api/types'

enum LoginAPI {
  // 登录
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

// 用户登录
export function accountLoginRequest(account: IAccount) {
  return pRequest.post<IDataType>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 获取某个用户信息
export function requestUserInfoById(id: number) {
  return pRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 获取侧边栏全部数据
export function reqUserMenuByRoleId(id: number) {
  console.log(id)
  return pRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
