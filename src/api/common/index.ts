import pRequest from '@/service'
import { IDataType, IDeparentAndRole } from '../types'

// 获取数据
export const reqGets = (url: string) => {
  return pRequest.get<IDataType>({
    url
  })
}

// 获取部门数据
export const reqGetDepartment = (url: string, queryInfo: any) => {
  return pRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 获取角色数据
export const reqGetRole = (url: string, queryInfo: any) => {
  return pRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// 创建数据
export const reqCreatePageData = (url: string, newData: any) => {
  return pRequest.post<IDataType>({
    url,
    data: newData
  })
}

// 修改数据
export const reqEditPageData = (url: string, editData: any) => {
  return pRequest.patch<IDataType>({
    url,
    data: editData
  })
}

// 获取菜单数据
// /menu/list
export const reqMenuPageData = (url: string) => {
  return pRequest.post<IDataType>({
    url
  })
}
