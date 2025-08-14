<script lang="ts" setup>
import { listApi as revenueListApi } from '@/api/revenue'
import type { RevenueList } from '@/types/revenue'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { formatNumberToThousands } from '@/utils/toThousands'

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