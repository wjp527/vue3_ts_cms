<template>
  <div class="p-table">
    <div class="header">
      <!-- 具名插槽 -->
      <slot name="header">
        <p class="title">{{ title }}</p>
        <div class="handler">
          <!-- 具名插槽 -->
          <slot name="haderHandler"></slot>
        </div>
      </slot>
    </div>

    <el-table
      class="table"
      :data="data"
      stripe
      border
      v-bind="childrenProps"
      @selection-change="handleSelectChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propsList" :key="propItem.prop">
        <!-- show-overflow-tooltip: 文字过长会在一行上显示，超出的回隐藏掉，鼠标碰上去的话，就会显示 -->
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- 动态插槽 -->
            <!-- 没有该插槽，就显示默认数据 -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 默认展示数据 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="isShowPagination">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
export default defineComponent({
  name: 'PTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    // 总数据
    data: {
      type: Array,
      required: true
    },
    // 数据总条数
    count: {
      type: Number,
      default: 0
    },
    // 配置项
    propsList: {
      type: Array as PropType<any>,
      required: true
    },
    // 是否展示索引
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否可以选择
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // pageSize和currentPage
    page: {
      type: Object,
      default: () => ({
        currentPage: 0,
        pageSize: 10
      })
    },
    // 是否可展开
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 是否展示分页器
    isShowPagination: {
      type: Boolean,
      default: true
    }
  },
  // 父传子的事件
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const opt = {
      offset: 0,
      size: 10
    }

    // 分页器
    const currentPage = ref(1)
    const pageSize = ref(opt.size)

    const small = ref(false)
    const background = ref(true)
    const disabled = ref(false)

    // 分页器
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    // 是否选中
    const handleSelectChange = (value: any) => {
      emit('selectionChange', value)
    }
    return {
      handleSelectChange,
      // 分页器
      currentPage,
      pageSize,
      small,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.p-table {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .title {
      color: #0a60bd;
      font-size: 20px;
      font-weight: 900;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
