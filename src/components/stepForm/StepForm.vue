<script lang="ts" setup>
import { ref } from 'vue'

const currentStep = ref<number>(0)
defineProps(["steps"])

</script>

<template>
  <div style="max-width: 600px;">
    <el-steps :active="currentStep" finish-status="success">
      <el-step v-for="(step,index) in steps" :key="index" :title="step.title" />
    </el-steps>
  </div>
</template>

<style lang="less" scoped>


</style>