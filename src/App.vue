<template>
  <div class="App">
    <ElConfigProvider :locale="locale">
      <router-view></router-view>
    </ElConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 国际化
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  setup(props, ctx) {
    return {
      locale: zhCn
    }
  },
  components: {
    ElConfigProvider
  }
})
</script>

<style lang="less">
.App {
  height: 100%;
}
</style>
