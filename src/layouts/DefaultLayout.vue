<script setup lang="ts">

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
  .el-aside{
    height: 100vh;
    background-color: #f4f4f4;
    box-shadow: 10px 2px 10px -3px rgba(0, 0, 0, 0.3);
  }
  .el-header{
    padding: 0 !important;
  }
  .el-main{
    height: 80vh;
    overflow: auto;
  }
</style>
