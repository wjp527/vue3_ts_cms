<template>
  <div class="page-search">
    <PForm v-bind="formConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>

      <template #footer>
        <div class="btn">
          <el-button>
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
          <el-button type="primary">
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
    formConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { formData }
  },
  components: {
    PForm,
    Refresh,
    Search
  }
})
</script>

<style lang="less" scoped>
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
