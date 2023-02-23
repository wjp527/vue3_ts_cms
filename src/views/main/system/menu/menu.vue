<template>
  <div class="menu">
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'MenuVue',
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
