<script lang="ts" setup>
import { ref } from "vue"
import { useTable } from "@/hooks/useTable"
import { orderDeleteApi } from "@/api/operation"
import { ElMessage } from "element-plus"

interface SearchParams {
  orderNo: string
  status: number
  number: string
  name: string
  startDate: string
  endDate: string
}

interface Order {
  orderNo: string,
  equipmentNo: string,
  date: string,
  startDate: string,
  endDate: string,
  money: number,
  pay: number,
  status: number,
}

const date = ref<any>()

const searchParams = ref<SearchParams>({
  orderNo:'',
  status:1,
  number:'',
  name:'',
  startDate:'',
  endDate:''
})

const handleChange = (val: string[]) => {
  searchParams.value.startDate = val[0]
  searchParams.value.endDate = val[1]
  console.log(val)
}

const { tableData, loading, totals, pageInfo, loadData, handleSizeChange, handleCurrentChange, resetPaginstion } = useTable<Order>('/orderList', searchParams)

const resetForm = () => {
  date.value = ''
  searchParams.value = {
    orderNo:'',
    status:1,
    number:'',
    name:'',
    startDate:'',
    endDate:''
  }
  resetPaginstion()
}

const selectedList = ref<Order[]>([])
const handleSelectionChange = (selection: Order[]) => {
  selectedList.value = selection
}

const handleBatchDelete = async() => {
  try{
    const res = await orderDeleteApi(selectedList.value.map((item: Order) => item.orderNo))
    if(res.code === 200){
      ElMessage.success(res.data)
      loadData()
    }
  }catch(err){
    ElMessage.error('删除失败')
    console.log(err)
  }
}

</script>

<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入订单号" v-model.trim="searchParams.orderNo" />
        </el-col>
        <el-col :span="6">
          <el-select placeholder="订单状态" v-model="searchParams.status">
            <el-option label="全部" :value="1" />
            <el-option label="进行中" :value="2" />
            <el-option label="已完成" :value="3" />
            <el-option label="异常" :value="4" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="设备编号" v-model.trim="searchParams.number" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-col>
        <el-col :span="6" class="mt" v-model="searchParams.name">
          <el-input placeholder="请输入站点名称" v-model.trim="searchParams.name" />
        </el-col>
        <el-col :span="6" class="mt">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="handleChange"
            value-format="YYYY-MM-DD"
          />
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-button type="danger" @click="handleBatchDelete" :disabled="!selectedList.length">批量删除</el-button>
      <el-button icon="Download" type="primary" :disabled="!selectedList.length">导出订单数据到Excel</el-button>
    </el-card>
    <el-card class="mt">
      <el-table :data="tableData" v-loading="loading" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="订单号" prop="orderNo" />
        <el-table-column label="设备编号" prop="equipmentNo" />
        <el-table-column label="订单日期" prop="date" />
        <el-table-column label="开始时间" prop="startTime" />
        <el-table-column label="结束时间" prop="endTime" />
        <el-table-column label="订单金额" prop="money" />
        <el-table-column label="支付方式" prop="pay" />
        <el-table-column label="订单状态" prop="status" >
          <template #default="scope">
            <el-tag :type="scope.row.status === 2 ? 'success' : scope.row.status === 3 ? 'primary': 'warning'">{{ scope.row.status === 2 ? '进行中' : scope.row.status === 3 ? '已完成' : '异常' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small">详情</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="totals > 0"
        v-model:current-page="pageInfo.page"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :pager-count="5"
        :total="totals"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 5px;
}
</style>