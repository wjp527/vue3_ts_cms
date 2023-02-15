<template>
  <div class="nav-header">
    <el-icon class="fold-menu" v-if="!isFold" @click="handleFoldClick"
      ><Expand
    /></el-icon>
    <el-icon class="fold-menu" v-else @click="handleFoldClick"
      ><Fold
    /></el-icon>
    <p>header</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
export default defineComponent({
  name: 'NavHeader',
  emit: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 子传父
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  },
  components: { Expand, Fold }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;

  .fold-menu {
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
