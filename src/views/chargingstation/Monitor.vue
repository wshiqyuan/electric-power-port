<script lang="ts" setup>
  import { ref, reactive } from 'vue'

  const select = ref('name')
  const formParams = reactive({
    input: '',
    value: 1
  })

</script>

<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="formParams.input" placeholder="请输入站点名称或ID">
            <template #append>
              <el-select v-model="select" style="width: 115px">
                <el-option label="按名称查询" value="name" />
                <el-option label="按ID查询" value="id" />
              </el-select>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="formParams.value" placeholder="充电站状态">
            <el-option label="全部" :value="1" />
            <el-option label="使用中" :value="2" />
            <el-option label="空闲中" :value="3" />
            <el-option label="维护中" :value="4" />
            <el-option label="待维修" :value="5" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>


</style>