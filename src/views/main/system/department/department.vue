<template>
  <div class="department">
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="department"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'DepartmentVue',
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
