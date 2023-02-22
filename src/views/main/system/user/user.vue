<template>
  <div class="user">
    <!-- 表单组件 -->
    <!-- v-model="formData" -->
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <!-- 表格组件 -->
    <div class="content">
      <PageContent
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        page-name="users"
      ></PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 搜索组件
import PageSearch from '@/components/page-search'
// 表单的配置项
import { searchFormConfig } from '@/views/main/system/user/config/search.config'
// 表格组件
import PageContent from '@/components/page-content'
// 表格的配置项
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'UserVue',
  setup() {
    // 获取构造函数类型
    // InstanceType
    const pageContentRef = ref<InstanceType<typeof PageContent>>()

    // 重置
    const handleResetClick = () => {
      pageContentRef.value?.getPageData()
    }
    // 查询
    const handleQueryClick = (queryInfo: any) => {
      pageContentRef.value?.getPageData(queryInfo)
    }
    return {
      // 表单的配置项
      searchFormConfig,
      // 表格的配置项
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef
    }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style lang="less" scoped>
.content {
  border-top: 20px solid #f5f5f5;
}
</style>
