<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbs" :key="item.id">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadCrumb } from '../index'
export default defineComponent({
  name: 'PBreadCrumb',
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadCrumb[]>,
      default: () => []
    }
  },
  setup(props, ctx) {
    return {}
  }
})
</script>

<style lang="less" scoped></style>
