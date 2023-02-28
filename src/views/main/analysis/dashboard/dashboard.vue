<template>
  <div class="dashboard">
    <!-- 顶部区域 -->
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <StatisticalPanel :panelData="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="7">
        <PCard title="分类商品数量(饼图)">
          <PieEcharts :options="categoryGoodsCount" />
        </PCard>
      </el-col>
      <el-col :span="10">
        <PCard title="不同城市商品销售" />
      </el-col>
      <el-col :span="7">
        <PCard title="分类商品数量(玫瑰图)" />
      </el-col>
    </el-row>

    <el-row :gutter="20" class="content-row">
      <el-col :span="12">
        <PCard title="分类商品的销量" />
      </el-col>
      <el-col :span="12">
        <PCard title="分类商品的收藏" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import StatisticalPanel from '@/base-ui/statistical-panel/src/statistical-panel.vue'
import PCard from '@/base-ui/card'

import useDashboard from '@/stores/main/analysis/dashboard'
// echarts
import { PieEcharts } from '@/components/page-echarts/index'
export default defineComponent({
  name: 'DashboardVue',
  components: { StatisticalPanel, PCard, PieEcharts },
  setup() {
    const dashboardStore = useDashboard()
    dashboardStore.getAnalysisDataAcsync()

    // const topPanelData = ''
    const topPanelData = computed(() => dashboardStore.topPanelData)

    dashboardStore.CategoryGoodsCount()
    dashboardStore.CategoryGoodsSale()
    dashboardStore.CategoryGoodsFavor()
    dashboardStore.AddressGoodsSale()

    // 实时进行更新
    let categoryGoodsCount = computed(() => {
      return dashboardStore.categoryGoodsCount.map((item) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })

    return { topPanelData, categoryGoodsCount }
  }
})
</script>

<style lang="less" scoped>
.dashboard {
  background-color: #f5f5f5;
  .row {
    margin-top: 20px;
  }
}
.content-row {
  margin-top: 20px;
}
</style>
