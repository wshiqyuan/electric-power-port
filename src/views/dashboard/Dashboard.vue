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
import { ref } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/store/tabs'
import { useChart } from '@/hooks/useChart'

const chartRef = ref(null)
const chartOptions: any = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }

useChart(chartRef, chartOptions)



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
            <el-col :span="6">
              <div ref="chartRef2" style="width: 100%; height: 400px;">
              </div>
            </el-col>
            <el-col :span="18">
              <div ref="chartRef" style="width: 100%; height: 400px;">

              </div>
            </el-col>
          </el-row>
      </el-card>
    </el-col>
    <el-col :span="6">

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

  .green {
    color: var(--el-color-success);
  }
  .red {
    color: var(--el-color-error);
  }

</style>
