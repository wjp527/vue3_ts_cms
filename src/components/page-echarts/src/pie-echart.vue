<template>
  <div class="pie-echart">
    <PBaseEchart :options="options" />
  </div>
</template>

<script lang="ts" name="PieEchart" setup>
import { defineProps, computed } from 'vue'
import PBaseEchart from '@/base-ui/echart/index'
import { IDataType } from '../types'

const props = defineProps<{
  options: IDataType
}>()

const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.options,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped>
.pie-echart {
}
</style>
