import pRequest from '@/service'

import { IDataType } from '@/api/types'
// 获取数据
export function getPageListData(data: any) {
  return pRequest.post<IDataType>({
    url: '/users/list',
    data
  })
}
