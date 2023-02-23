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
      >
        <template #status="slotProps">
          <el-button
            plain
            size="small"
            :type="slotProps.row.enable ? 'primary' : 'danger'"
            >{{ slotProps.row.enable ? '已启用' : '已禁用' }}</el-button
          >
        </template>
      </PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 搜索组件
import PageSearch from '@/components/page-search'
// 表单的配置项
import { searchFormConfig } from '@/views/main/system/user/config/search.config'
// 表格组件
import PageContent from '@/components/page-content'
// 表格的配置项
import { contentTableConfig } from './config/content.config'

// hooks
import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'UserVue',
  setup() {
    // 获取构造函数类型
    const { handleResetClick, handleQueryClick, pageContentRef } =
      usePageSearch()
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
