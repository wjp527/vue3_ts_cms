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
          <PieEchart :options="categoryGoodsCount" />
        </PCard>
      </el-col>
      <el-col :span="10">
        <PCard title="不同城市商品销售">
          <MapEchart :map-data="addressGoodsSale" />
        </PCard>
      </el-col>
      <el-col :span="7">
        <PCard title="分类商品数量(玫瑰图)">
          <RoseEchart :options="categoryGoodsCount" />
        </PCard>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="content-row">
      <el-col :span="12">
        <PCard title="分类商品的销量">
          <LineEchart
            :xLabels="categoryGoodsSale.xLabels"
            :values="categoryGoodsSale.values"
          />
        </PCard>
      </el-col>
      <el-col :span="12">
        <PCard title="分类商品的收藏">
          <BarEchart
            :dataAxis="categoryGoodsFavor.dataAxis"
            :data="categoryGoodsFavor.data"
          />
        </PCard>
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
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts/index'

export default defineComponent({
  name: 'DashboardVue',
  components: {
    StatisticalPanel,
    PCard,
    // 饼图
    PieEchart,
    // 玫瑰图
    RoseEchart,
    // 折线图
    LineEchart,
    // 柱状图
    BarEchart,
    // 地图
    MapEchart
  },
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
    // 分类商品数量
    let categoryGoodsCount = computed(() => {
      return dashboardStore.categoryGoodsCount.map((item) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })

    // 分类商品的销量
    let categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: string[] = []
      const categoryGoodsSale = dashboardStore.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLabels, values }
    })

    // 分类商品的收藏
    let categoryGoodsFavor = computed(() => {
      const dataAxis: string[] = []
      const data: string[] = []

      const categoryGoodsFavor = dashboardStore.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        dataAxis.push(item.name)
        data.push(item.goodsFavor)
      }
      return {
        dataAxis,
        data
      }
    })

    // 地图
    let addressGoodsSale = computed(() => {
      return dashboardStore.addressGoodsSale.map((item) => {
        return {
          name: item.address,
          value: item.count
        }
      })
    })

    return {
      topPanelData,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
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
