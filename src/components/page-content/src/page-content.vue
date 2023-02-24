<template>
  <div class="page-content">
    <PTable
      :data="dataList"
      :count="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      @selectionChange="selectionChange"
    >
      <!-- 具名插槽 -->
      <!-- header中的插槽 -->

      <template #haderHandler>
        <el-button type="primary" v-if="isCreate">
          <el-icon><Plus /></el-icon>{{ contentTableConfig.add }}</el-button
        >
        <el-popconfirm
          title="Are you sure to delete this?"
          v-if="isDelete"
          @confirm="removeById"
          @cancel="handleCancel"
        >
          <template #reference>
            <el-button type="danger">
              <el-icon> <Delete /> </el-icon>
              {{ contentTableConfig.remove }}
            </el-button>
          </template>
        </el-popconfirm>
        <el-button>
          <el-icon>
            <Refresh />
          </el-icon>
        </el-button>
      </template>
      <template #footer />

      <!-- 动态插槽 -->
      <!-- 这个插槽名是从table.vue 里进行动态获取的 -->
      <!-- <template #status="slotProps">
        <el-button
          plain
          size="small"
          :type="slotProps.row.enable ? 'primary' : 'danger'"
          >{{ slotProps.row.enable ? '已启用' : '已禁用' }}</el-button
        >
      </template> -->
      <template #createAt="slotProps">
        <p>{{ $filters.formatTime(slotProps.row.createAt) }}</p>
      </template>
      <template #updateAt="slotProps">
        <p>{{ $filters.formatTime(slotProps.row.updateAt) }}</p>
      </template>
      <!-- <template #image="slotProps">

      </template> -->

      <!-- 在page-content中动态插入剩余的插槽 -->
      <!--
        核心代码:#[item.slotName]="scope"
        这个#: 是把template当成一整个插槽了
        #[item.slotName]="scope": 我自己感觉就是我在我自己身上使用插槽,并给自己赋值
        循环就是: 遍历动态插槽,并且给每一个插槽都给赋值(scope)
        就简单来说,下面这个代码就是上面的代码,只不过,下面的是动态渲染的,不用自己在进行添加的操作了
       -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <!-- 找到该插槽名,并且进行赋值 -->
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- 动态插槽 -->
      <template #handler="scope">
        <el-button circle type="primary" v-if="isUpdate">
          <el-icon>
            <EditPen />
          </el-icon>
        </el-button>

        <el-popconfirm
          title="是否要删除?"
          v-if="isDelete"
          @confirm="handleConfirm(scope.row)"
          @cancel="handleCancel"
        >
          <template #reference>
            <el-button circle type="danger">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </PTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
import useSystem from '@/stores/main/system/system'
import PTable from '@/base-ui/table'
import { EditPen, Delete, Refresh, Plus } from '@element-plus/icons-vue'
import { usePermission } from '@/hooks/usePermission'
import { ElMessage } from 'element-plus'

export default defineComponent({
  props: {
    // 表格配置项
    contentTableConfig: {
      type: Object,
      required: true
    },
    // 对应着每条接口的路径
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 获取store
    const systemStore = useSystem()

    // const opt = ref({
    //   pageName: props.pageName,
    //   id: 0
    // })

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1.双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })

    watch(pageInfo, () => getPageData())

    // 2.获取要在表格中展示的数据
    let dataList: any = ref([])
    let dataCount = ref(0)

    let opt: any[] = []
    // 请求数据(模糊匹配)
    const getPageData = async (queryInfo: any = {}) => {
      if (!isQuery) return
      let res = await systemStore.getPageListAsync({
        pageName: props.pageName,
        queryInfo: {
          // 偏移量
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          // 每页的条数
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })

      dataList.value = res?.list
      dataCount.value = res?.count ?? 0
    }
    getPageData()

    // 3.取出指定类型的数据(用户管理/角色管理)
    //  第一种方式
    dataList.value = systemStore.pageListData(props.pageName)
    dataCount.value = systemStore.pageListCount(props.pageName)
    // 第二种方式
    // 这些数据不要是响应式的
    // const dataList = computed(() => systemStore.pageListData(props.pageName))
    // const dataCount = computed(() => systemStore.pageListCount(props.pageName)
    const selectionChange = (payload: any) => {
      opt = payload
    }

    // 4.获取其他的动态插槽名称
    // props.contentTableConfig?.propsList: 获取表头数据
    const otherPropSlots = props.contentTableConfig?.propsList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false

        return true
      }
    )

    // 删除用户列表的事件
    const handleConfirm = async (row: any) => {
      const opt = {
        pageName: props.pageName,
        id: row.id
      }
      systemStore.getPageListDelAsync(opt)

      getPageData()
      ElMessage.success('删除成功')
    }
    // 批量删除
    const removeById = async () => {
      // console.log(opt.length)
      for (let i = 0; i < opt.length; i++) {
        opt[i].pageName = props.pageName
        systemStore.getPageListDelAsync(opt[i])
        if (i === opt.length - 1) {
          let res = await systemStore.getPageListAsync({
            pageName: props.pageName,
            queryInfo: {
              // 偏移量
              offset:
                (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
              // 每页的条数
              size: pageInfo.value.pageSize
            }
          })

          dataList.value = res?.list
        }
      }
    }
    const handleCancel = () => {
      console.log('cannel')
    }

    return {
      dataList,
      selectionChange,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      handleConfirm,
      handleCancel,
      removeById
    }
  },
  components: { PTable, EditPen, Delete, Refresh, Plus }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
}
</style>
