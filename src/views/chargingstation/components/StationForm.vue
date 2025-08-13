<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref<boolean>(true)


</script>

<template>
    <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>


</style>