<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <PForm v-bind="modelConfig" v-model="formData"></PForm>
      <!-- <slot></slot> -->
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
import { defineComponent, ref, watch } from 'vue'
import useCommon from '@/stores/common'

import PForm from '@/base-ui/from/index'

export default defineComponent({
  name: 'PageModel',
  components: {
    PForm
  },
  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})

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
    const handleConfirmClick = () => {
      console.log(1)
      console.log(formData)
      // dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑

        let opt = {
          pageName: props.pageName,
          id: '',
          editData: props.defaultInfo
        }
        // commonStore.EditPageDataAsync()
      } else {
        // 新建
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
