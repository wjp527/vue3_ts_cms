<template>
  <div class="login-account">
    <el-form
      ref="ruleFormRef"
      :model="account"
      label-width="120px"
      :rules="phoneRules"
    >
      <el-form-item label="手机号" prop="phone" label-width="80">
        <el-input v-model="account.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code" label-width="80">
        <el-input v-model="account.code" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { phoneRules } from '../config/account-config'
export default defineComponent({
  name: 'LoginPhone',
  setup(props, ctx) {
    // 表单的Ref对象
    const ruleFormRef = ref<FormInstance>()
    //  表单的数据
    const account = reactive({
      phone: '',
      code: ''
    })

    // 提交表单
    const onSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    // 清空表单
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    return {
      account,
      onSubmit,
      phoneRules,
      ruleFormRef,
      resetForm
    }
  }
})
</script>

<style lang="less" scoped></style>
