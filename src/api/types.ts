// 接口返回的格式类型，如果要复用的话，这里的格式类型要改成项目中接口返回的格式化类型
export interface IDataType<T = any> {
  code: number
  data: T
}

// 请求部门数据和角色管理数据的参数类型
export interface IDeparentAndRole {
  offset: string
  size: string
}
