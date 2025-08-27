<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { orderDetailApi } from '@/api/operation'
import { ElMessage } from 'element-plus'


const orderNo = ref<string>('')
const route = useRoute()

const orderDetail = ref<any>({})

if (route.query.orderNo) {
  orderNo.value = route.query.orderNo as string
}

onMounted( async() => {
  try{
    const { data } = await orderDetailApi(orderNo.value)
    orderDetail.value = data
    ElMessage.success('获取订单详情成功')
  }catch(err){
    ElMessage.error('获取订单详情失败')
  }
})

watch(() => route.query.orderNo, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    orderNo.value = newVal as string
    fetchData()
  }
},{immediate: false})

const fetchData = async () => {
  try {
    const res = await orderDetailApi(orderNo.value)
    orderDetail.value = res.data
    ElMessage.success('获取订单详情成功')
  } catch (error) {
    ElMessage.error('获取订单详情失败')
    console.error('获取订单详情失败:', error)
  }
}



</script>

<template>
  <div>
    <el-card>
      <el-descriptions
        class="margin-top"
        :title="`订单编号：${orderDetail.orderNo}`"
        :column="3"
        border
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Document />
              </el-icon>
              订单编号
            </div>
          </template>
          {{ orderDetail.orderNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Cellphone />
              </el-icon>
              设备编号
            </div>
          </template>
          {{ orderDetail.equipmentNo }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Calendar />
              </el-icon>
              订单日期
            </div>
          </template>
          {{ orderDetail.date }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <OfficeBuilding />
              </el-icon>
              站点名称
            </div>
          </template>
          <el-tag size="small">{{ orderDetail.stationName }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <VideoPlay />
              </el-icon>
              开始时间
            </div>
          </template>
          {{ orderDetail.startTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <VideoPause />
              </el-icon>
              结束时间
            </div>
          </template>
          {{ orderDetail.endTime }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Money />
              </el-icon>
              订单金额(元)
            </div>
          </template>
          {{ orderDetail.money }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <CreditCard />
              </el-icon>
              支付方式
            </div>
          </template>
          {{ orderDetail.pay }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Place />
              </el-icon>
              所属城市
            </div>
          </template>
          {{ orderDetail.city }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <DataAnalysis />
              </el-icon>
              充电量(度)
            </div>
          </template>
          {{ orderDetail.electricity }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <VideoCamera />
              </el-icon>
              充电设备
            </div>
          </template>
          {{ orderDetail.equipment }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Timer />
              </el-icon>
              充电总时长(小时)
            </div>
          </template>
          {{ orderDetail.timeCount }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              负责人姓名
            </div>
          </template>
          {{ orderDetail.manager }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <iphone />
              </el-icon>
              负责人电话
            </div>
          </template>
          {{ orderDetail.managerPhone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user />
              </el-icon>
              维保人姓名
            </div>
          </template>
          {{ orderDetail.maintenance }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <iphone />
              </el-icon>
              维保人电话
            </div>
          </template>
          {{ orderDetail.maintPhone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Finished />
              </el-icon>
              订单状态
            </div>
          </template>
          <el-tag size="small"  :type="orderDetail.status === 2 ? 'success' : orderDetail.status === 3 ? 'primary': 'warning'">{{ orderDetail.status === 2 ? '进行中' : orderDetail.status === 3 ? '已完成' : '异常' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Coin />
              </el-icon>
              服务费(元)
            </div>
          </template>
          {{ orderDetail.service }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Coin />
              </el-icon>
              停车费(元)
            </div>
          </template>
          {{ orderDetail.parking }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Coin />
              </el-icon>
              电费(元)
            </div>
          </template>
          {{ orderDetail.electricity }}
        </el-descriptions-item>
        <el-descriptions-item :rowspan="2">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <ChatLineSquare />
              </el-icon>
              备注
            </div>
          </template>
          {{ orderDetail.remark }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <Wallet />
              </el-icon>
              收费信息
            </div>
          </template>
          电费：{{ orderDetail.electricity }}元，停车费：{{ orderDetail.parking }}元，服务费：{{ orderDetail.service }}元，总共：{{ orderDetail.money }}元
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>


</style>