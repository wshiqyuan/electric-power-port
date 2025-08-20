<script lang="ts" setup>

</script>

<template>
  <div>
    <el-card>
      <el-descriptions
        class="margin-top"
        :title="`订单编号：${$route.query.orderNo}`"
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
          {{ $route.query.orderNo }}
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
          C231
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
          2025-8-21
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
          <el-tag size="small">北京朝阳区充电站</el-tag>
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
          08:32:43
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
          12:22:11
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
          41.2
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
          支付宝
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
          北京
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
          86
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
          充电桩(快充)
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
          4
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
          李强
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
          18734287321
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
          刘来
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
          13734876382
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
          <el-tag size="small">已完成</el-tag>
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
          4
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
          12.2
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
          25
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
          暂无
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
          电费：25元，停车费：12.2元，服务费：4元，总共：41.2元
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>


</style>