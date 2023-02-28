<template>
  <div class="statistical">
    <!-- 头部 -->
    <div class="header">
      <p>{{ panelData.title }}</p>
      <el-icon><Warning /></el-icon>
    </div>
    <!-- 数字滚动 -->
    <div class="content">
      <PCountUp
        :number="panelData.number1"
        :option="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
      />
    </div>
    <div class="footer">
      <span>
        {{ panelData.subtitle }}
        <PCountUp
          :number="panelData.number2"
          :option="
            panelData.amount === 'saleroom' ? counterOption2 : counterOption1
          "
        />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Warning } from '@element-plus/icons-vue'
// 数字滚动
import PCountUp from '@/base-ui/count-up/index'
export default defineComponent({
  name: 'cardTop',
  props: {
    panelData: { type: Object, default: () => ({}) }
  },
  components: { PCountUp, Warning },
  setup(props, ctx) {
    const counterOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: '' // 单位
    }
    const counterOption2 = {
      decimalPlaces: 0, // 保留两位
      prefix: '￥' // 单位
    }
    return {
      counterOption1,
      counterOption2
    }
  }
})
</script>

<style scoped lang="less">
@h: 38px;

.statistical {
  display: flex;
  padding: 0 20px;
  background: white;
  flex-direction: column;
  justify-content: flex-start;

  height: 130px;
  margin-bottom: 20px;
  overflow: hidden;
  text-align: left;

  .header {
    display: flex;
    height: @h;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    // border: 1px solid red;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .footer {
    display: flex;
    height: @h;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
