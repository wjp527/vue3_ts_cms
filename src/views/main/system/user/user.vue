<template>
  <div class="user">
    <!-- <PForm v-bind="formConfig" :formData="formData" /> -->
    <PForm v-bind="formConfig" v-model="formData" />
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
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { formConfig, formData }
  },
  components: {
    PForm
  }
})
</script>

<style scoped></style>
