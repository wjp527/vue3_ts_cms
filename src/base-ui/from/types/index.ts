// 显示框子的类型(联合类型)
type IFormType = 'input' | 'password' | 'select' | 'datepicker'

// 框子的配置项
export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: string
  // 针对于select
  options?: any[]
  // 针对于特殊的属性
  otherOptions?: any
  // form表单中的标签是否要隐藏掉(input/select)
  isHidden?: boolean
}

// 表单的总体配置项
export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
