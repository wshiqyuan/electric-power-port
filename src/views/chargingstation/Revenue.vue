<script lang="ts" setup>
import { listApi as revenueListApi, chartApi as revenueChartApi, fromApi as revenueFromApi } from '@/api/revenue'
import type { RevenueList, RevenueForm } from '@/types/revenue'
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { formatNumberToThousands } from '@/utils/toThousands'
import { useChart } from '@/hooks/useChart'
import { usePagination } from '@/hooks/usePagination'

const listData = ref<RevenueList[]>([])

onMounted(async () => {
  try {
    const res = await revenueListApi()
    listData.value = res.data
  } catch (error: any) {
    console.log(error)
    ElMessage.error('请求失败')
  }
})


const chartRef = ref(null)
const loading = ref<boolean>(false)

const setChartOptions = async () => {
  const chartOptions = reactive({
    tooltip: {
      trigger:'axis'
    },
    legend: {
      top: '4%',
      data: []
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: [
      {
        type:'value',
        name: '销售',
        position:'left'
      },
      {
        type: 'value',
        name: '访问量',
        position:'right'
      }
    ],
    series: [
      {
        name:'',
        type:'bar',
        data:[],
        yAxisIndex: 0,
        itemStyle:{
          color: '#409eff'
        }
      },
      {
        name: '',
        type: 'line',
        data: [],
        yAxisIndex: 1,
        itemStyle:{
          color: '#7B5BF1'
        },
        smooth: true
      }
    ]
  })
  try{
    const res = await revenueChartApi()
    chartOptions.legend.data = res.data.list.map((item:any) => item.name)
    chartOptions.series[0].name = res.data.list[0].name
    chartOptions.series[0].data = res.data.list[0].data
    chartOptions.series[1].name = res.data.list[1].name 
    chartOptions.series[1].data = res.data.list[1].data
    return chartOptions
  }catch(error: any){
    console.log(error)
    ElMessage.error('请求失败')
  }
}

useChart(chartRef, setChartOptions)

const formData = ref<RevenueForm[]>([])
const name = ref<string>('')

const loadData = async () => {
  loading.value = true
  try{
    const { data:{ list, total } } = await revenueFromApi({
      name: name.value,
      ...pageInfo
    })
    setTotal(total)
    formData.value = list
    loading.value = false
  }catch(error: any){
    console.log(error)
    ElMessage.error('请求失败')
  }
}
const { total, pageInfo, handleSizeChange, handleCurrentChange, setTotal } = usePagination(loadData)

onMounted (async () => {
  await loadData()
})


</script>

<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4" v-for="item in listData" :key="item.dataName">
        <el-card>
          <div class="title">
            <div class="round mr">
              <el-icon>
                <Document />
              </el-icon>
            </div>
              <h4>{{ item.dataName }}</h4>   
          </div>         
          <div class="total mt">
            <h1>{{ formatNumberToThousands(item.data) }}</h1>
            <div v-if="item.percent < 0" class="percent red"> {{ item.percent }}% </div>
            <div v-if="item.percent > 0" class="percent green"> {{ item.percent }}% </div>
            <div v-else></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="mt">
      <div ref="chartRef" class="chart" style="width: 100%; height: 300px;"></div>
    </el-card>
    <el-card class="mt">
      <el-input @keyup.enter="loadData" v-model.trim="name" style="width: 500px;" placeholder="请输入站点名称">
        <template #append>
          <el-button type="primary" icon="Search" @click="loadData"></el-button>
        </template>
      </el-input>
      <el-table
        :data="formData"
        v-loading="loading"
      >
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column label="充电站名称" prop="name" />
        <el-table-column label="充电站ID" prop="id" />
        <el-table-column label="所属城市" prop="city" />
        <el-table-column label="充电站总数(个)" prop="count" />
        <el-table-column label="单日总收入(元)" prop="dailyIncome" sortable>
          <template #default="scoped">
            <span style="padding-right: 5px;">{{ scoped.row.dailyIncome }}</span>
            <el-tag :type="scoped.row.mpercent > 0 ? 'success' : 'danger'" >
              {{ scoped.row.percent > 0 ? '+' + scoped.row.percent : scoped.row.percent }}%
            </el-tag>
          </template>
        </el-table-column>  
        <el-table-column label="月度总收入(元)" prop="monthIncome" sortable>
          <template #default="scoped">
            <span style="padding-right: 5px;">{{ scoped.row.monthIncome }}</span>
            <el-tag :type="scoped.row.mpercent > 0 ? 'success' : 'danger'" >
              {{ scoped.row.mpercent > 0 ? '+' + scoped.row.mpercent : scoped.row.mpercent }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="电费营收(元)" prop="electricity" />
        <el-table-column label="停车费总营收(元)" prop="parkingFee" />
        <el-table-column label="服务费总营收(元)" prop="serviceFee" />
        <el-table-column label="会员储值金(元)" prop="member" />
      </el-table>
      <el-pagination
      v-show="total > 0"
      v-model:current-page="pageInfo.page"
      v-model:page-size="pageInfo.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  .round {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(235, 236, 245);
    text-align: center;
    line-height: 30px;
  }
  h4{
    color: #666
  }
}
.total {
  display: flex;
  align-items: center;
  h1{
    font-size: 30px;
    margin-right: 20px;
  }
  .percent {
    display: inline-block;
    padding: 3px 5px;
    line-height: 20px;
    font-size: 12px;
    border-radius: 2px;
    line-height: 20px;
  }
}

.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 5px;
}

.green {
  background-color: rgb(235, 247, 239);
  color: rgb(40, 180, 99);
}

.red {
  background-color: rgb(248, 216, 216);
  color: rgb(235, 66, 66);
}

</style>