import { ref } from 'vue'
import pageModel from '@/components/page-model'

type callBackFn = (item?: any) => void
// 打开添加/修改的弹出框
export function usePageModel(newCb?: callBackFn, editCb?: callBackFn) {
  // pageModel类型的ref
  const pageModelRef = ref<InstanceType<typeof pageModel>>()
  // 要回显的数据
  const defaultInfo = ref({})
  // 添加列表数据
  const handleNewData = () => {
    // 清空表单数据
    defaultInfo.value = {}
    // 打开添加弹窗
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }

  // 修改列表数据
  const handleEditData = (row: any) => {
    // 回显表单数据
    defaultInfo.value = { ...row }
    // 打开修改弹窗
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb(row)
  }

  return [pageModelRef, handleNewData, handleEditData, defaultInfo]
}
