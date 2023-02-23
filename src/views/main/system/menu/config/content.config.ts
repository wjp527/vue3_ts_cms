export const contentTableConfig = {
  title: '菜单列表',
  propsList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '160'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '60'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '100'
    },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100'
    },
    {
      prop: 'sort',
      label: '排序',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  // 是否可展开
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  // 不展示分页器
  isShowPagination: false
}
