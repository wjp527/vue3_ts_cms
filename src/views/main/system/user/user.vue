<template>
  <div class="user">
    <PForm v-bind="formConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 表单组件
import PForm from '@/base-ui/from/index'
// 表单的配置项
import { formConfig } from './config/search.config'
export default defineComponent({
  name: 'UserVue',
  setup() {
    return { formConfig }
  },
  components: {
    PForm
  }
})
</script>

<style scoped></style>
