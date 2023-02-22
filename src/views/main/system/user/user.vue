<template>
  <div class="user">
    <!-- 表单组件 -->
    <!-- v-model="formData" -->
    <PageSearch :searchFormConfig="searchFormConfig" />
    <!-- 表格组件 -->
    <div class="content">
      <PageContent
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
    // 接收到table组件传过来的数据 check 选中的数据
    const selectionChange = (payload: any) => {
      console.log(payload)
    }

    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      // 表单的配置项
      searchFormConfig,
      // 是否可选中
      selectionChange,
      // 表格的配置项
      contentTableConfig,
      formData
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
