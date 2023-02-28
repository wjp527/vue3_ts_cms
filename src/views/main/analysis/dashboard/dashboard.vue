<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <StatisticalPanel :panelData="item" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import StatisticalPanel from '@/base-ui/statistical-panel/src/statistical-panel.vue'

import useDashboard from '@/stores/main/dashboard'
export default defineComponent({
  name: 'DashboardVue',
  components: { StatisticalPanel },
  setup() {
    const dashboardStore = useDashboard()
    dashboardStore.getAnalysisDataAcsync()

    const topPanelData = computed(() => dashboardStore.topPanelDatas)
    return { topPanelData }
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
</style>
