import pRequest from '@/service'

import { IDataType } from '@/api/types'

// 枚举
enum DashboardAPI {
  categoryGoodsAmountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getAmountList() {
  return pRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsAmountList
  })
}

// 分类商品数量
export function getCategoryGoodsCount() {
  return pRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}
// 不同城市商品销量
export function getCategoryGoodsSale() {
  return pRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}
// 分类商品数量
export function getCategoryGoodsFavor() {
  return pRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}
// 不同分类的销量
export function getAddressGoodsSale() {
  return pRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}
