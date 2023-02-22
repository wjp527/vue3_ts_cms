// 表单的配置项
import { IForm } from '@/base-ui/from/index'
export const searchFormConfig: IForm = {
  // 数据集
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'ID',
      placeholder: '请输入用户ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        {
          label: '篮球',
          value: '篮球basketball'
        },
        {
          label: '足球',
          value: '足球football'
        }
      ]
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  // 文字的宽度
  labelWidth: '120px'
  // 每个框子的样式配置
  // itemStyle: {},
  // 一行显示几个
  // colLayout: {}
}
