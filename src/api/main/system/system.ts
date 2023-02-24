import pRequest from '@/service'

import { IDataType } from '@/api/types'
// 获取数据
export function reqPageListData(url: string, data: any) {
  return pRequest.post<IDataType>({
    url,
    data
  })
}

// 删除数据
export function reqPageListDelById(url: string) {
  return pRequest.delete<IDataType>({
    url
  })
}
