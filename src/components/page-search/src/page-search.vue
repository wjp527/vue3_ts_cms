<template>
  <div class="page-search">
    <PForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>

      <template #footer>
        <div class="btn">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><Search /></el-icon>
            查询
          </el-button>
        </div>
      </template>
    </PForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 表单组件
import PForm from '@/base-ui/from/index'

import { Refresh, Search } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'UserVue',
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}

    // 2.优化二: 当用户点击重置
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 重置事件
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 优化三: 当用户点击搜索
    const handleQueryClick = () => {
      // formData: 搜索的结果
      emit('queryBtnClick', formData.value)
    }
    return { formData, handleResetClick, handleQueryClick }
  },
  components: {
    PForm,
    Refresh,
    Search
  }
})
</script>

<style lang="less" scoped>
.page-search {
  border-top: 20px solid #f5f5f5;
  border-bottom: 20px solid #f5f5f5;
}
.header {
  text-align: center;
  padding: 20px 0;
  color: #0a60bd;
}

.btn {
  display: flex;
  justify-content: flex-end;
  margin: 10px 20px;
}
</style>
