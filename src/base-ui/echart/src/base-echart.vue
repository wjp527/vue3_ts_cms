<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" name="App" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import * as echarts from 'echarts'

// echart配置的格式类型
import { EChartsOption } from 'echarts'

import useEchart from './hooks/useEcharts'
// 定义props
const props = withDefaults(
  // 格式的类型
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  // 默认的格式参数
  {
    width: '100%',
    height: '360px'
  }
)
const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  // echartDivRef.value!: 确保echartDivRef.value一定有值
  const { setOptions } = useEchart(echartDivRef.value!)
  // 数据实时更新
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped></style>
