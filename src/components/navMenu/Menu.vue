<script lang="ts" setup>
  import { useUserStore } from '@/store/auth'
  import MenuItem from './MenuItem.vue'
  import logo from '@/assets/logo.png'

  const userStore = useUserStore()
  const menuItems = userStore.menu
</script>

<template>
  <div class="logo">
    <img :src="logo" width="34px" height="34px">
    <h1>动力港</h1>
  </div>
  <el-menu
    :router="true"
    :default-active="$route.path"
    class="el-menu-demo"
    >
    <menu-item 
    v-for="item in menuItems" 
    :item="item"
    :key="item.url"
    ></menu-item>
  </el-menu>
</template>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 10px 0;
  img{
    margin-left: -15px;
  }
  h1{
    color: #333;
    margin-left: 10px;
    font-size: 22px;
  }
}
.el-menu{
  border-right: none;
}

</style>
