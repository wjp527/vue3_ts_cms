import { IForm } from '@/base-ui/from/index'
export const formConfig: IForm = {
  // 数据集
  formItems: [
    {
      type: 'input',
      label: 'ID',
      rules: [],
      placeholder: '请输入用户ID'
    },
    {
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      rules: [],
      placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '喜欢的运动',
      rules: [],
      placeholder: '请选择喜欢的运动',
      options: [
        {
          id: 0,
          label: '篮球'
        },
        {
          id: 1,
          label: '足球'
        }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      rules: [],
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
