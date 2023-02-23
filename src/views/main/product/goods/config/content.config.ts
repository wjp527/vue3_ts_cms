export const contentTableConfig = {
  title: '商品列表',
  // 是否显示序号
  showIndexColumn: true,
  // 是否可选中
  showSelectColumn: true,
  propsList: [
    {
      prop: 'name',
      label: '商品名',
      minWidth: '100'
    },
    {
      prop: 'oldPrice',
      label: '原价格',
      minWidth: '100',
      slotName: 'oldPrice'
    },
    {
      prop: 'newPrice',
      label: '现价格',
      minWidth: '100'
    },
    {
      prop: 'imgUrl',
      label: '商品图片',
      minWidth: '100',
      slotName: 'image'
    },
    {
      prop: 'status',
      label: '状态',
      minWith: '100',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      // 用于具名插槽
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      // 用于具名插槽
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ]
}
