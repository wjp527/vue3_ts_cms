<template>
  <div class="login-account">
    <el-form
      ref="ruleFormRef"
      :model="account"
      label-width="120px"
      :rules="rules"
    >
      <el-form-item label="账号" prop="name" label-width="60">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="60">
        <el-input v-model="account.password" />
      </el-form-item>
      <el-form-item label-width="60">
        <div class="account-control">
          <el-checkbox
            v-model="isKeepPassword"
            label="是否记住密码"
            size="large"
          />
          <el-button key="primary" type="primary" link>忘记密码</el-button>
        </div>
      </el-form-item>
      <el-form-item style="margin: 0">
        <el-button
          class="submit"
          type="primary"
          @click="onSubmit(ruleFormRef)"
          style="widht: 100%"
          >立即登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { rules } from '../config/account-config'
export default defineComponent({
  name: 'LoginAccount',
  setup(props, ctx) {
    // 表单的Ref对象
    const ruleFormRef = ref<FormInstance>()
    //  表单的数据
    const account = reactive({
      name: '',
      password: ''
    })

    let isKeepPassword = ref(false)

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
      rules,
      ruleFormRef,
      resetForm,
      isKeepPassword
    }
  }
})
</script>

<style lang="less" scoped>
.login-account {
  .account-control {
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: right;
  }
}

/deep/.el-form-item__content {
  margin: 0 !important;
}
.submit {
  width: 100%;
}
</style>
