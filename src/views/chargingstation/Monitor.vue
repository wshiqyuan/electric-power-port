<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { listApi } from '@/api/chargingstation'

  const select = ref('name')
  const formParams = reactive({
    input: '',
    value: 1
  })

  const loadData = async () => {
    const { data:{ list, total } } = await listApi({ page: 1, pageSize: 10, status: 1 })
    console.log(list, total)
  }

  onMounted(() => {
    loadData()
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
    <el-card class="mt">
      <el-row>
        <el-col :span="6">
          <el-statistic title="累计充电量(度)" :value="2689003" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="累计充电次数(次)" :value="149775" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="服务区域(个)" :value="88" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="累计效益(元)" :value="3568900" />
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-button type="primary" icon="Plus">新增充电站</el-button>
    </el-card>
    <el-card class="mt">

    </el-card>
  </div>
</template>

<style lang="less" scoped>
.el-col {
  text-align: center;
}

</style>