<template>
  <div class="page-content">
    <PTable
      :data="dataList"
      v-bind="contentTableConfig"
      @selectionChange="selectionChange"
    >
      <!-- 具名插槽 -->
      <!-- header中的插槽 -->
      <!-- <template #header /> -->
      <template #haderHandler>
        <el-button type="primary">新增用户</el-button>
        <el-button>
          <el-icon><Refresh /></el-icon>
        </el-button>
      </template>
      <template #footer />

      <!-- 动态插槽 -->
      <!-- 这个插槽名是从table.vue 里进行动态获取的 -->
      <template #status="slotProps">
        <el-button
          plain
          size="small"
          :type="slotProps.row.enable ? 'primary' : 'danger'"
          >{{ slotProps.row.enable ? '已启用' : '已禁用' }}</el-button
        >
      </template>
      <template #createAt="slotProps">
        <p>{{ $filters.formatTime(slotProps.row.createAt) }}</p>
      </template>
      <template #updateAt="slotProps">
        <p>{{ $filters.formatTime(slotProps.row.updateAt) }}</p>
      </template>
      <template #handler>
        <el-button circle type="primary">
          <el-icon><EditPen /></el-icon
        ></el-button>
        <el-button circle type="danger">
          <el-icon><Delete /></el-icon>
        </el-button>
      </template>
    </PTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useSystem from '@/stores/main/system/system'
import PTable from '@/base-ui/table'
import { EditPen, Delete, Refresh } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    // 表格配置项
    contentTableConfig: {
      type: Object,
      required: true
    },
    // 对应着每条接口的路径
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 获取store
    const systemStore = useSystem()

    // 获取要在表格中展示的数据
    let dataList: any = []

    // 取出指定类型的数据(用户管理/角色管理)
    dataList = systemStore.pageListData(props.pageName)

    const opt = {
      offset: 0,
      size: 10
    }
    // 请求数据
    systemStore.getPageListAsync({
      pageName: props.pageName,
      opt
    })
    const selectionChange = () => ({})
    return { dataList, selectionChange }
  },
  components: { PTable, EditPen, Delete, Refresh }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
}
</style>
