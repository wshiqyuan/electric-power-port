<script lang="ts" setup>
import { listApi as revenueListApi, chartApi as revenueChartApi, fromApi as revenueFromApi } from '@/api/revenue'
import type { RevenueList, RevenueForm } from '@/types/revenue'
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { formatNumberToThousands } from '@/utils/toThousands'
import { useChart } from '@/hooks/useChart'

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

const loadData = async () => {
    const { data:{ list, total } } = await revenueFromApi({
      name: '',
      page: 1,
      pageSize: 10
    })
    console.log(list, total)
}
loadData()

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
      <el-tale
        :data="formData"
      >

      </el-tale>
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

.green {
  background-color: rgb(235, 247, 239);
  color: rgb(40, 180, 99);
}

.red {
  background-color: rgb(248, 216, 216);
  color: rgb(235, 66, 66);
}

</style>