<script lang="ts" setup>
import flash from '@/assets/flash.png'
import flash2 from '@/assets/flash2.png'
import flash3 from '@/assets/flash3.png'
import repair from '@/assets/repair.png'
import progress from '@/assets/progress.png'
import remain from '@/assets/remain.png'
import total from '@/assets/total.png'
import money from '@/assets/money.png'
import daily from '@/assets/daily.png'
import { reactive, ref } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/store/tabs'
import { useChart } from '@/hooks/useChart'
import { chartDataApi, chartDataApi2, chartDataApi3 } from '@/api/dashboard'

const chartRef = ref(null)

const setChartOptions = async () => {
  const chartOptions: any = reactive({
    title: {
      text: '电量统计',
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00','20:00','21:00']
    },
    yAxis: {
      type: 'value',
      axisLabel:{
        formatter:'{value}kw'
      }
    },
    series: [
      {
        name: '',
        type: 'line',
        data: [],
        smooth:true,
        lineStyle:{
          width: 4
        },
        itemStyle:{
          color: 'purple',
          shadowBlur: 5,
          shadowColor: 'rgba(0,255,0,0.5)'
        }
      },
      {
        name: '',
        type: 'line',
        data: [],
        smooth:true,
        lineStyle:{
          width: 4
        },
        itemStyle:{
          color:'lightgreen',
          shadowBlur: 5,
          shadowColor: 'rgba(0,255,0,0.5)'
        }
      },
      {
        name: '',
        type: 'line',
        data: [],
        smooth:true,
        lineStyle:{
          width: 4
        },
        itemStyle:{
          color: 'skyblue',
          shadowBlur: 5,
          shadowColor: 'rgba(0,255,0,0.5)'
        }
      },
    ]
  })
  const res =  await chartDataApi()
  if (res.code === 200) {
    chartOptions.legend.data = res.data.list.map((item: any) => item.name)
    for ( let i = 0; i < res.data.list.length; i++ ) {
      chartOptions.series[i].name = res.data.list[i].name
      chartOptions.series[i].data = res.data.list[i].data
    }
    return chartOptions
  }
}

useChart(chartRef, setChartOptions)

const chartRef2 = ref(null)
const setChartOptions2 = async () => {
  const chartOptions: any = reactive({
    legend: {
      top: 'bottom'
    },
    tooltip:{
      trigger: 'item',
      formatter:'{a}<br />{b}:{c}'
    },
    series: [
      {
        name: '营收占比',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 8
        },
        label: {
          show: false,
          position:'inner'
        },
        emphasis:{
          label:{
            show:true,
            fontSize:"16",
            fontWeight:"bold"
          }
        },
        data: [
          { value: 35, name: '充电桩' },
          { value: 30, name: '充电站' },
          { value: 25, name: '充电柜' }
        ],
        labelLine:{
          smooth:true,
          length:1
        }
      }
    ],
    graphic:{
      type:"text",
      left:"center",
      top:"center",
      style:{
        text:"营收占比",
        fontSize:16,
        fill:'#333'
      }
    }
  })
  const res =  await chartDataApi2()
  chartOptions.series[0].data = res.data.list
  return chartOptions

}
useChart(chartRef2, setChartOptions2)

const chartRef3 = ref(null)
const setChartOptions3 = async () => {
  const chartOptions: any = reactive({
    radar: {
    // shape: 'circle',
    indicator: [
      { name: '闲置数', max: 65 },
      { name: '使用数', max: 160 },
      { name: '故障数', max: 300 },
      { name: '维修数', max: 380 },
      { name: '更换数', max: 550 },
      { name: '报废数', max: 240 }
    ]
    },
    series: [
      {
        name: '设备总览',
        type: 'radar',
        data: [
          {
            value: [],
            name: '设备总览'
          }
        ]
      }
    ]
  })
  const res = await chartDataApi3()
  if (res.code === 200) {
    chartOptions.series[0].data[0].value = res.data.list
    return chartOptions
  }
} 
useChart(chartRef3, setChartOptions3)



const router = useRouter()
const { addTab, setCurrentTab } = useTabsStore()

const handleClick = (e: Event) => {
  const target = e.target as HTMLElement
  const colElement = target.closest('.el-col')
  if (colElement) {
    const path = colElement.querySelector('img')?.dataset.path
    const icon = colElement.querySelector('img')?.classList[0] as string
    const name = colElement.querySelector('p')?.textContent // 获取 p 标签的文本内容
    if (path && name) {
      setCurrentTab(name, path)
      addTab(name, path, icon)
      router.push(path)
    }
  }
}


</script>

<template>
  <el-row>
    <el-col :span="18">
      <el-card>
        <div class="title">
          <h3 class="mr">今日设备运行状态</h3>
          <p>更新时间：2023-08-01 10:00</p>
          <el-icon color="#86909c" style="margin-left: 5px; padding-bottom: 4px;">
            <Refresh />
          </el-icon>
        </div>
        <div class="equipment">
          <div class="item">
            <h4 class="mt mb">充电桩使用率</h4>
            <img :src="flash" alt="" class="mb mt">
            <h1 class="mb">2263 / 3398</h1>
            <div class="statistic-card">
              <el-statistic :value="47">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip
                      effect="dark"
                      content="出现异常状况的设备数量，请尽快处理"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="red">
                    16%
                    <el-icon class="red">
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mt mb">充电柜使用率</h4>
            <img :src="flash2" alt="" class="mb mt">
            <h1 class="mb">655 / 1233</h1>
            <div class="statistic-card">
              <el-statistic :value="22">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip
                      effect="dark"
                      content="出现异常状况的设备数量，请尽快处理"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    12%
                    <el-icon class="green">
                      <CaretBottom />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <h4 class="mt mb">充电站使用率</h4>
            <img :src="flash3" alt="" class="mb mt">
            <h1 class="mb">72 / 95</h1>
            <div class="statistic-card">
              <el-statistic :value="6">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip
                      effect="dark"
                      content="出现异常状况的设备数量，请尽快处理"
                      placement="top"
                    >
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="red">
                    7%
                    <el-icon class="red">
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h1>常用功能</h1>
          </div>
        </template>
        <div class="quick mt mb">
          <el-row @click="handleClick">
            <el-col :span="4">
              <img class="Warning" :src="repair" alt="" data-path="/chargingstation/manage">
              <p>充电桩管理</p>
            </el-col>
            <el-col :span="4">
              <img class="DocumentCopy" :src="progress" alt="" data-path="/operations/orders">
              <p>订单管理</p>
            </el-col>
            <el-col :span="4">
              <img class="User" :src="remain" alt="" data-path="/personal">
              <p>个人中心</p>
            </el-col>
            <el-col :span="4">
              <img class="Money" :src="total" alt="" data-path="/operations/total">
              <p>计费管理</p>
            </el-col>
            <el-col :span="4">
              <img class="DataAnalysis" :src="money" alt="" data-path="/chargingstation/revenue">
              <p>营收统计</p>
            </el-col>
            <el-col :span="4">
              <img class="VideoCamera" :src="daily" alt="" data-path="/chargingstation/monitor">
              <p>充电站监控</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h1>能源统计</h1>
          </div>
        </template>
          <el-row>
            <el-col :span="8">
              <div ref="chartRef2" style="width: 100%; height: 400px;">
              </div>
            </el-col>
            <el-col :span="16">
              <div ref="chartRef" style="width: 100%; height: 400px;">
              </div>
            </el-col>
          </el-row>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card class="ml">
        <template #header>
          <div class="card-header">
            <h1>设备总览</h1>
          </div>
        </template>
        <div ref="chartRef3" style="width: 100%; height: 240px;"></div>
      </el-card>
      <el-card class="mt ml">
        <template #header>
          <div class="card-header">
            <h1>营收统计表</h1>
          </div>
        </template>
          <ul class="ranking-list">
            <li class="ranking-item">
              <span class="rank" style="background-color: rgb(103, 194, 58); color: #f4f3f3;">1</span>
              <span class="store-name">广州</span>
              <span class="sales">512,457</span>
              <span style="margin-left: 50px;">
                24
                <el-icon class="green">
                  <CaretTop />
                </el-icon>
              </span>
            </li>
            <li class="ranking-item">
              <span class="rank" style="background-color: rgb(15,131,218); color: #f4f3f3;">2</span>
              <span class="store-name">上海</span>
              <span class="sales">323,234</span>
              <span style="margin-left: 50px;">
                21
                <el-icon class="red">
                  <CaretBottom />
                </el-icon>
              </span>
            </li>
            <li class="ranking-item">
              <span class="rank" style="background-color: rgb(245,109, 81); color: #f4f3f3;">3</span>
              <span class="store-name">佛山</span>
              <span class="sales">193,255</span>
              <span style="margin-left: 50px;">
                37
                <el-icon class="green">
                  <CaretTop />
                </el-icon>
              </span>
            </li>
            <li class="ranking-item">
              <span class="rank">4</span>
              <span class="store-name">珠海</span>
              <span class="sales">120,540</span>
              <span style="margin-left: 50px;">
                19
                <el-icon class="green">
                  <CaretTop />
                </el-icon>
              </span>
            </li>
            <li class="ranking-item">
              <span class="rank">5</span>
              <span class="store-name">深圳</span>
              <span class="sales">66,233</span>
              <span style="margin-left: 50px;">
                29
                <el-icon class="red">
                  <CaretBottom />
                </el-icon>
              </span>
            </li>
            <li class="ranking-item">
              <span class="rank">6</span>
              <span class="store-name">厦门</span>
              <span class="sales">54,335</span>
              <span style="margin-left: 50px;">
                31
                <el-icon class="red">
                  <CaretBottom />
                </el-icon>
              </span>
            </li>
            <li class="ranking-item">
              <span class="rank">7</span>
              <span class="store-name">长沙</span>
              <span class="sales">33,941</span>
              <span style="margin-left: 50px;">
                15
                <el-icon class="green">
                  <CaretTop />
                </el-icon>
              </span>

            </li>
          </ul>
      </el-card>
      <el-card class="mt ml">
        <template #header>
          <div class="card-header">
            <h1>故障报警</h1>
          </div>
        </template>
        <el-timeline style="max-width: 600px">
          <el-timeline-item :hollow="true" timestamp="2025/8/5" placement="top" type="danger">
            <el-card>
              <h4>矿业北路电路中断</h4>
              <p>Tom committed 2025/8/5 6:31</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item :hollow="true" timestamp="2025/6/14" placement="top" type="warning">
            <el-card>
              <h4>南京路14号终端故障</h4>
              <p>Tom committed 2025/6/14 12:20</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item :hollow="true" timestamp="2025/5/2" placement="top" type="danger">
            <el-card>
              <h4>中兴路6号机组断电</h4>
              <p>Tom committed 2025/5/2 15:26</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
  .title {
    display: flex;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    align-items: flex-end;
    margin-bottom: 20px;
    p {
      color: #86909c;

    }
  }

  .quick {
    .el-col {
      img:hover {
        cursor: pointer;
      }
      p{
        cursor: pointer;
      }
    }
  }

  .equipment {
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    .item {
      h1{ 
        font-size: 36px;
      }
      ::v-deep .el-statistic__content{
        margin-top: 5px !important;
        margin-bottom: 10px !important;
      }
    }
  }

  .quick{
    text-align: center;
    margin-top: 20px;
    p{
      margin-top: 10px;
      color: #333;
    }
  }

  .ranking-list {
    .ranking-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      .rank{
        display: inline-block;
        font-weight: 700;
        color: #666;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        text-align: center;
        line-height: 25px;
      }
      .store-name{
        flex-grow: 1;
        padding: 0 10px;
      }
      .sales{
        color:#666;
      }
    }
    .ranking-item:nth-child(even){
      background-color: rgb(253, 246, 236);
    }
  }

  .green {
    color: var(--el-color-success);
  }
  .red {
    color: var(--el-color-error);
  }

</style>
