<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <NavMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <NavHeader @foldChange="foldChange" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 导入侧边栏
import NavMenu from '@/components/nav-menu'
// 头部
import NavHeader from '@/components/nav-header'
export default defineComponent({
  name: 'MainVue',
  setup(props, ctx) {
    const isCollapse = ref(false)
    const foldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { foldChange, isCollapse }
  },
  components: { NavMenu, NavHeader }
})
</script>

<style lang="less" scoped>
.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
}

.el-aside {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}
</style>
