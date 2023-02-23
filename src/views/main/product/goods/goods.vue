<template>
  <div class="goods" ref="">
    <PageSearch
      :search-form-config="searchConfig"
      @query-btn-click="handleQueryClick"
      @reset-btn-click="handleResetClick"
    ></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      ref="pageContentRef"
    >
      <template #image="slotProps">
        <div class="demo-image__preview">
          <el-image
            style="width: 100px; height: 100px"
            :src="slotProps.row.imgUrl"
            :preview-src-list="[slotProps.row.imgUrl]"
            fit="cover"
            :z-index="zIndex"
          />
        </div>
      </template>

      <template #oldPrice="slotProps">
        {{ '￥' + slotProps.row.oldPrice }}
      </template>

      <template #status="slotProps">
        <el-button
          plain
          size="small"
          :type="slotProps.row.status ? 'primary' : 'danger'"
          >{{ slotProps.row.status ? '已启用' : '已禁用' }}</el-button
        >
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import PageSearch from '@/components/page-search'
import { defineComponent } from 'vue'
// 商品表格配置项
import { contentTableConfig } from './config/content.config'
// 表单配置项
import { searchConfig } from '../../product/goods/config/search.config'

// hooks
import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  name: 'GoodsVue',
  setup() {
    const zIndex = 999

    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()
    return {
      contentTableConfig,
      zIndex,
      searchConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
    }
  },
  components: { PageSearch }
})
</script>

<style lang="less" scoped>
/deep/ .el-table__row {
  z-index: 0 !important;
}
/deep/ .el-table__cell,
/deep/.el-table__header-wrapper,
/deep/ .el-table__body-wrapper {
  z-index: 0 !important;
}

/deep/ .el-table__row--striped {
  position: relative;
  z-index: 0px !important;
}
/deep/ .el-table__row {
  position: relative !important;
  z-index: 0 !important;
}
</style>
