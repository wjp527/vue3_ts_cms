import { ref } from 'vue'
import PageContent from '@/components/page-content'

// 表单的重置和查询操作
export function usePageSearch() {
  // InstanceType
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 重置
  const handleResetClick = () => {
    // 请求所有数据
    pageContentRef.value?.getPageData()
  }
  // 查询
  const handleQueryClick = (queryInfo: any) => {
    // 根据条件进行请求
    pageContentRef.value?.getPageData(queryInfo)
  }

  return {
    pageContentRef,
    handleResetClick,
    handleQueryClick
  }
}
