<template>
  <el-table :data="data" stripe class="table">
    <template v-for="item in propsList" :key="item.prop">
      <el-table-column v-bind="item" align="center">
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row">
            <!-- 默认展示数据 -->
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    propsList: {
      type: Array,
      required: true
    }
  },
  setup(props, ctx) {
    return {}
  }
})
</script>

<style lang="less" scoped></style>
