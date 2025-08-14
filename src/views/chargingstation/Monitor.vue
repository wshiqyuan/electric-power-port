<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { listApi, deleteApi } from '@/api/chargingstation'
  import StationForm from './components/StationForm.vue'
  import type { RowType } from '@/types/station'
  import { useStationStore } from '@/store/station'
  import { ElMessage } from 'element-plus'

  const select = ref('name')
  const formParams = reactive({
    input: '',
    value: 1
  })

  const tableData = ref<RowType[]>([])
  
  const pageInfo = ref({
    page: 1,
    pageSize: 10,
  })

  const loading = ref<boolean>(false)

  const totalNum = ref<number>(0)

  const loadData = async () => {
    loading.value = true
    try{
      const { data:{ list, total } } = await listApi({ ...pageInfo.value, status:formParams.value, [select.value]: formParams.input })
      loading.value = false
      tableData.value = list
      totalNum.value = total
    }catch(error){
      ElMessage.error('查询失败')
    }
  }

  onMounted(() => {
    loadData()
  })

  const handleSizeChange = (pageSize: number) => {
    pageInfo.value.pageSize = pageSize
    loadData()
  }

  const handleCurrentChange = (page: number) => {
    pageInfo.value.page = page
    loadData()
  }

  const resetForm = () => {
    formParams.input = ''
    formParams.value = 1
    select.value = 'name'
    pageInfo.value.page = 1
    pageInfo.value.pageSize = 10
    loadData()
  }

  const visible = ref<boolean>(false)
  const stationStore = useStationStore()

  const edit = (row: RowType) => {
    visible.value = true
    stationStore.setRowData(row)
  }

  const handleAdd = () => {
    stationStore.clearRowData()
    visible.value = true
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteApi(id)
      if (res.code === 200) {
        ElMessage.success(res.data)
        console.log(res)
        loadData()
      }
    } catch (error) {
      ElMessage.error('删除失败')
    } 
  }

</script>

<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model.trim="formParams.input" placeholder="请输入站点名称或ID">
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
        <el-col :span="6" style="display: flex; justify-content: flex-start;">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
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
      <el-button type="primary" icon="Plus" @click="handleAdd">新增充电站</el-button>
    </el-card>
    <el-card class="mt">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="56" />
        <el-table-column prop="name" label="站点名称" />
        <el-table-column prop="id" label="站点ID" />
        <el-table-column prop="city" label="所属城市" />
        <el-table-column prop="fast" label="快充数" />
        <el-table-column prop="slow" label="慢充数" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 2" type="primary">使用中</el-tag>
            <el-tag v-if="scope.row.status === 3" type="success">空闲中</el-tag>
            <el-tag v-if="scope.row.status === 4" type="warning">维护中</el-tag>
            <el-tag v-if="scope.row.status === 5" type="danger">待维修</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="now" label="当前充电数" />
        <el-table-column prop="fault" label="故障数" />
        <el-table-column prop="person" label="负责人" />
        <el-table-column prop="tel" label="联系电话" />
        <el-table-column label="操作" class="button" width="150">
          <template #default="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              icon="WarningFilled"
              icon-color="#F56C6C"
              title="确定删除当前站点信息吗?"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      v-show="totalNum > 0"
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="totalNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
    </el-card>
    <StationForm :dialog-visible="visible" @close:dialogVisible="visible = false" @reload="loadData" />

  </div>
</template>

<style lang="less" scoped>
.el-col {
  text-align: center;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 5px;
}
</style>