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
        <el-table-column v-bind="propItem" align="center">
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
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="usersCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import useSystem from '@/stores/main/system/system'
import { defineComponent, ref } from 'vue'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'PTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      required: true
    },
    propsList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    }
  },
  // 父传子的事件
  emits: ['selectionChange'],
  setup(props, { emit }) {
    const systemStore = useSystem()
    const { usersList, usersCount } = storeToRefs(systemStore)

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

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
      // opt.offset = opt.size
      systemStore.getPageListAsync(opt)
    }

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
      handleCurrentChange,
      usersCount
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
