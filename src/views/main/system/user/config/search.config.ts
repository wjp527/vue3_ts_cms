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
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
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
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        {
          title: '启用',
          value: 1
        },
        {
          title: '禁用',
          value: 0
        }
      ]
    },

    {
      field: 'createAt',
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