<template>
  <div class="From">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <el-form :model="formItems" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.id">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rule="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>

              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  clearable
                >
                  <el-option
                    v-for="i in item.options"
                    :key="i.value"
                    :value="i.value"
                    :label="i.label"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <!-- 将 item.otherOptions 的属性全部绑到 el-date-picker组件中 -->
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100px"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types/index'
export default defineComponent({
  name: 'FromVue',
  props: {
    // PForm  组件传来的formData数据
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      // 类型断言,要求formItems IFormItem 类型的
      type: Array as PropType<IFormItem[]>,
      // 写默认值的时候,如果是对象,数组类型的,就写箭头函数
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    itemStyle: {
      type: Object,
      default: () => ({
        padding: '10px 20px'
      })
    },
    // 每行展示几个配置项
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px 展示4个
        lg: 8, // ≥1200px 展示3个
        md: 12, // ≥992px 展示2个
        sm: 24, // ≥768px 展示1个
        xs: 24 // ≥768px 展示1个
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style lang="less" scoped>
/deep/ .el-form-item {
  margin: 0 !important;
  margin: 9px 0 !important;
}
.el-select {
  width: 100%;
}
</style>
