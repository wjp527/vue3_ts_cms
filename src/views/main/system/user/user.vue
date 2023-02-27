<template>
  <div class="user">
    <!-- 表单组件 -->
    <!-- v-model="formData" -->
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <!-- 表格组件 -->
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      page-name="users"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    >
      <template #status="slotProps">
        <el-button
          plain
          size="small"
          :type="slotProps.row.enable ? 'primary' : 'danger'"
          >{{ slotProps.row.enable ? '已启用' : '已禁用' }}</el-button
        >
      </template>
    </PageContent>

    <!-- 弹窗组件 -->
    <PageModel
      ref="pageModelRef"
      :model-config="modelConfigRef"
      :default-info="defaultInfo"
      pageName="users"
    ></PageModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
// 搜索组件
import PageSearch from '@/components/page-search'
// 表格组件
import PageContent from '@/components/page-content'
// 弹窗组件
import PageModel from '@/components/page-model'

// 配置文件
// 表单的配置项
import { searchFormConfig } from './config/search.config'
// 表格的配置项
import { contentTableConfig } from './config/content.config'
// 弹窗的配置项
import { modelConfig } from './config/model.config'

// hooks
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'

import useCommon from '@/stores/common'

export default defineComponent({
  name: 'UserVue',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  setup() {
    // 获取构造函数类型
    // 表单的重置和查询操作
    // 1.处理密码框的显示与隐藏
    const { handleResetClick, handleQueryClick, pageContentRef } =
      usePageSearch()

    //添加/修改的弹出框 是否隐藏/显示某个标签
    const newCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    // pageModelRef: pageModel组件的实例，用于调用子组件里面的数据/方法
    // defaultInfo: 要回显的数据
    const [pageModelRef, handleNewData, handleEditData, defaultInfo] =
      usePageModel(newCallback, editCallback)

    //2. 动态添加部门和角色列表
    const commonStore = useCommon()
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )

      departmentItem!.options = commonStore.entireDepartment.map((item) => {
        return {
          title: item.name,
          value: item.id
        }
      })

      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = commonStore.entireRole.map((item) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      return modelConfig
    })

    return {
      // 表单的配置项
      searchFormConfig,
      // 表格的配置项
      contentTableConfig,
      // 重置的回调
      handleResetClick,
      // 查询的回调
      handleQueryClick,
      // 表格组件的 Ref可响应式对象
      pageContentRef,
      // 弹窗的配置项
      modelConfigRef,
      // 打开添加弹框
      handleNewData,
      // 打开添加弹框
      handleEditData,
      // pageModel组件的实例
      pageModelRef,
      // 回显要修改的数据
      defaultInfo
    }
  }
})
</script>

<style lang="less" scoped></style>
