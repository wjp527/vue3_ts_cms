<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" label-width="120px" :rules="rules">
      <el-form-item label="账号" prop="name" label-width="60">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="60">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, ref } from 'vue'
import type { ElForm, FormInstance, FormRules } from 'element-plus'
import useLogin from '@/stores/login/login'

import { rules } from '../config/account-config'

// 缓存
import localCache from '@/utils/cache'
export default defineComponent({
  name: 'LoginAccount',
  setup(props, ctx) {
    //  表单的数据
    const account = reactive({
      name: localCache.getCache('userInfo')?.name ?? '',
      password: localCache.getCache('userInfo')?.password ?? ''
    })

    const loginStore = useLogin()
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 提交表单
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('userInfo', account)
            loginStore.accountLoginAsync({
              ...account
            })
          } else {
            localCache.deleteCache('userInfo')
          }
          // 2.开始进行登录验证
        }
      })
    }

    return {
      account,
      loginAction,
      rules,
      formRef
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
