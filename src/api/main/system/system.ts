import pRequest from '@/service'

import { IDataType } from '@/api/types'
// 获取数据
export function reqPageListData(url: string, data: any) {
  return pRequest.post<IDataType>({
    url,
    data
  })
}
