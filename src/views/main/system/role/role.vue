<template>
  <div class="role">
    <!-- 搜索 -->
    <PageSearch :search-form-config="searchConfig" />
    <!-- pageName: 代表要调用哪一个接口 -->
    <PageContent
      :content-table-config="contentTableConfig"
      page-name="role"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    />

    <PageModel
      ref="pageModelRef"
      :modelConfig="modelConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="data"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check="handleCheckChange"
        />
      </div>
    </PageModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { ElTree } from 'element-plus'
// 表格组件
import PageContent from '@/components/page-content'
// 表格配置
// 表单组件
import PageSearch from '@/components/page-search'
import PageModel from '@/components/page-model'
// 搜索表单配置
import { searchConfig } from './config/search.config'
import { contentTableConfig } from './config/content-config'
import { modelConfig } from './config/model.config'

// store
import useCommon from '@/stores/common'

// hooks
import { usePageModel } from '@/hooks/usePageModel'
import { MenuLeafKeys } from '@/utils/map.menus'
export default defineComponent({
  name: 'RoleVue',
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 处理pageModel的hook
    const editCallback = (item: any) => {
      const leafKeys = MenuLeafKeys(item.menuList)

      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModelRef, handleNewData, handleEditData, defaultInfo] =
      usePageModel(undefined, editCallback)

    const defaultProps = {
      children: 'children',
      label: 'name'
    }

    const commonStore = useCommon()

    // 菜单数据
    // const data: any = ref(commonStore.menuList)
    const data = computed(() => commonStore.menuList)

    const otherInfo = ref({})

    // tree改变时，回返回已选中的权限
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      searchConfig,
      pageModelRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      modelConfig,
      data,
      defaultProps,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  },
  components: {
    PageContent,
    PageSearch,
    PageModel
  }
})
</script>

<style lang="less" scoped>
.menu-tree {
  margin-left: 40px;
}
</style>
