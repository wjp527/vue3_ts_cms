export const contentTableConfig = {
  // 标题
  title: '用户列表',
  // 是否显示序号
  showIndexColumn: true,
  // 是否可选中
  showSelectColumn: true,
  add: '新增用户',
  remove: '批量删除',
  // 表头数据
  propsList: [
    {
      prop: 'name',
      label: '用户名',
      minwidth: '100'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      minwidth: '100'
    },
    {
      prop: 'cellphone',
      label: '手机号',
      minwidth: '100'
    },
    {
      prop: 'enable',
      label: '状态',
      minwidth: '100',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minwidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minwidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ]
}
