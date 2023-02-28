export const modelConfig = {
  add: '操作角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  // 文字的宽度
  labelWidth: '120px',
  // 每个框子的样式配置
  itemStyle: {},
  colLayout: {
    span: 24
  }
}
