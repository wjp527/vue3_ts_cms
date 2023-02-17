<template>
  <div class="user">
    <!-- <PForm v-bind="formConfig" :formData="formData" /> -->
    <PageSearch :formConfig="formConfig" />

    <div class="content">
      <PTable :data="userList" :propsList="propsList">
        <!-- 动态插槽 -->
        <!-- 这个插槽名是从table.vue 里进行动态获取的 -->
        <template #status="slotProps">
          <el-button type="primary">{{
            slotProps.row.enable ? '已启用' : '已禁用'
          }}</el-button>
        </template>
        <template #createAt="slotProps">
          <p>{{ slotProps.row.createAt }}</p>
        </template>
        <template #updateAt="slotProps">
          <p>{{ slotProps.row.updateAt }}</p>
        </template>
      </PTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 系统管理状态
import useSystem from '@/stores/main/system/system'
// 搜索组件
import PageSearch from '@/components/page-search'
// 响应式
import { storeToRefs } from 'pinia'
// 表单的配置项
import { formConfig } from '@/views/main/system/user/config/search.config'
// 表格组件
import PTable from '@/base-ui/table'
export default defineComponent({
  name: 'UserVue',
  setup() {
    const systemStore = useSystem()
    const { userList, userCount } = storeToRefs(systemStore)

    const opt = {
      offset: 0,
      size: 10
    }
    systemStore.getPageListAsync(opt)

    const propsList = [
      {
        prop: 'name',
        label: '用户名',
        minwidth: '100'
      },
      {
        prop: 'realname',
        label: '真实姓名',
        minwidth: '100'
      },
      {
        prop: 'cellphone',
        label: '手机号',
        minwidth: '100'
      },
      {
        prop: 'enable',
        label: '状态',
        minwidth: '100',
        slotName: 'status'
      },
      {
        prop: 'createAt',
        label: '创建时间',
        minwidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minwidth: '250',
        slotName: 'updateAt'
      }
    ]
    return {
      formConfig,
      userList,
      propsList
    }
  },
  components: {
    PageSearch,
    PTable
  }
})
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
  .table {
    width: 100%;
    // margin: 10px 20px;
  }
}
</style>
