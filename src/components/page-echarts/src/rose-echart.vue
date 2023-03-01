<template>
  <div class="App">
    <PBaseEchart :options="options" />
  </div>
</template>

<script lang="ts" name="RoseEchart" setup>
import { computed, defineProps } from 'vue'
import PBaseEchart from '@/base-ui/echart'

import { EChartsType } from 'echarts'
import { IDataType } from '../types'
const props = defineProps<{
  options: IDataType
}>()
const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '类别数据',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.options
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
