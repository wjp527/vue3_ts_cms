<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup(props, ctx) {
    return {}
  }
})
</script>

<style lang="less">
.App {
  height: 100%;
}
</style>
