export const contentTableConfig = {
  title: '部门管理',
  add: '新增部门',
  propsList: [
    {
      prop: 'id',
      label: 'ID',
      minWidth: '100'
    },
    {
      prop: 'name',
      label: '部门名',
      minWidth: '100'
    },
    {
      prop: 'leader',
      label: '领导',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '160',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '160',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '160',
      slotName: 'handler'
    }
  ]
}
