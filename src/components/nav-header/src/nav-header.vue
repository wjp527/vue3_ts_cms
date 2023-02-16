<template>
  <div class="nav-header">
    <el-icon class="fold-menu" v-if="!isFold" @click="handleFoldClick"
      ><Expand
    /></el-icon>
    <el-icon class="fold-menu" v-else @click="handleFoldClick"
      ><Fold
    /></el-icon>
    <div class="content">
      <div>面包屑</div>
      <NavUserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import NavUserInfo from './nav-userInfo.vue'
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
      handleFoldClick,
      CircleCloseFilled
    }
  },
  components: { Expand, Fold, NavUserInfo }
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
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
}
</style>
