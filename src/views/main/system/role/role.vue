<template>
  <div class="role">
    <!-- 搜索 -->
    <PageSearch :search-form-config="searchConfig" />
    <!-- pageName: 代表要调用哪一个接口 -->
    <PageContent :content-table-config="contentTableConfig" page-name="role" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 表格组件
import PageContent from '@/components/page-content'
// 表格配置
// 表单组件
import PageSearch from '@/components/page-search'
// 搜索表单配置
import { searchConfig } from './config/search.config'
import { contentTableConfig } from './config/content-config'
export default defineComponent({
  name: 'RoleVue',
  setup() {
    return { contentTableConfig, searchConfig }
  },
  components: {
    PageContent,
    PageSearch
  }
})
</script>

<style scoped></style>
