<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      :before-close="handleClose"
      destroy-on-close
    >
      <!-- 表单组件 -->
      <PForm v-bind="modelConfig" v-model="formData"></PForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'
// Form表单组件
import PForm from '@/base-ui/from'
// 提示框
import { ElMessageBox } from 'element-plus'
import useCommon from '@/stores/common'
import useSystem from '@/stores/main/system/system'

export default defineComponent({
  name: 'UserVue',
  props: {
    // 配置项
    modelConfig: {
      type: Object,
      required: true
    },
    // 要回显的数据
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: { PForm },
  setup(props) {
    const formData = ref<any>({})
    // 弹框的显示与隐藏
    const dialogVisible = ref(false)
    const handleClose = (done: () => void) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    // 回显数据
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modelConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑
    const commonStore = useCommon()
    const handleConfirmClick = async () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        let opt = {
          pageName: props.pageName,
          id: props.defaultInfo.id,
          editData: { ...formData.value }
        }
        commonStore.EditPageDataAsync(opt)

        const systemStore = useSystem()
        // let res = await systemStore.getPageListAsync({
        //   pageName: props.pageName,
        //   queryInfo: {
        //     offset: 0,
        //     size: 10
        //   }
        // })
        // formData.value = res?.list
      } else {
        // 新建
        let opt = {
          pageName: props.pageName,
          newData: { ...formData.value }
        }
        commonStore.createPageDataAsync(opt)
      }
    }
    return {
      formData,
      dialogVisible,
      handleClose,
      handleConfirmClick
    }
  }
})
</script>

<style lang="less" scoped></style>
