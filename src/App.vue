<template>
  <div class="App">
    <h2>{{ $store.state.name }}</h2>
    <el-row class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
    <!-- <el-avatar :size="50" :src="circleUrl" /> -->
    <button @click="nextLogin">login</button>
    <button @click="nextMain">main</button>
    <router-view></router-view>
  </div>
</template>

<script>
// 导入路由的一些方法
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const Router = useRouter()
    const nextLogin = () => {
      Router.push('/login')
    }
    const nextMain = () => {
      Router.push('/main')
    }

    return {
      nextLogin,
      nextMain
    }
  }
}
</script>

<style lang="less" scoped></style>
