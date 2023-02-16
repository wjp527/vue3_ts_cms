// 显示框子的类型
type IFormType = 'input' | 'password' | 'select' | 'datepicker'

// 框子的配置项
export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: string
  // 针对于select
  options?: any[]
  // 针对于特殊的属性
  otherOptions?: any
}

// 表单的总体配置项
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
