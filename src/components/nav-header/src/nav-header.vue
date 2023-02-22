<template>
  <div class="nav-header">
    <el-icon class="fold-menu" v-if="!isFold" @click="handleFoldClick"
      ><Expand
    /></el-icon>
    <el-icon class="fold-menu" v-else @click="handleFoldClick"
      ><Fold
    /></el-icon>
    <div class="content">
      <PBreadCrumb :breadcrumbs="breadcrumbs" />
      <NavUserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
// 用户信息
import NavUserInfo from './nav-userInfo.vue'
// 面包屑组件,面包屑类型
import PBreadCrumb from '@/base-ui/breadcrumb/index'
// 面包屑数据
import { pathMapBreadcrumbs } from '@/utils/map.menus'
import useLogin from '@/stores/login/login'
import { useRouter } from 'vue-router'
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

    // 路径变化,或者左侧侧边栏数据变化,就会重新渲染页面
    const breadcrumbs = computed(() => {
      // 获取左侧参数数据
      const { userMenus } = useLogin()

      // 获取当前的路径
      const Router = useRouter()
      const path = Router.currentRoute.value.path
      return pathMapBreadcrumbs(userMenus, path)
    })

    return {
      isFold,
      handleFoldClick,
      CircleCloseFilled,
      breadcrumbs
    }
  },
  components: { Expand, Fold, NavUserInfo, PBreadCrumb }
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
