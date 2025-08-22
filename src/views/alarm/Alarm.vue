<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAlarmList } from '@/api/alarm'
import type { AlarmList } from '@/types/alarm'
import { ElMessage } from 'element-plus'
import { getLabel } from './fieldLabelMap'
import StepForm from '@/components/stepForm/StepForm.vue'
import { TitleComponent } from 'echarts/components'

const topRadio = ref<number>(1)
const alarmList = ref<AlarmList[]>([])

onMounted( async() => {
  try {
    const { data } = await getAlarmList()
    alarmList.value = data
  } catch (error) {
    ElMessage.error('获取告警列表失败')
  }
})


// 抽屉模块
const drawer = ref<boolean>(false)
const steps = [
  { title: '基本信息' },
  { title: '审批信息' },
  { title: '负责人信息' }
]

</script>

<template>
  <div>
    <el-card>
      <el-radio-group v-model="topRadio" size="large">
        <el-radio-button label="严重告警" :value="1"></el-radio-button>
        <el-radio-button label="紧急告警" :value="2"></el-radio-button>
        <el-radio-button label="重要告警" :value="3"></el-radio-button>
        <el-radio-button label="一般告警" :value="4"></el-radio-button>
      </el-radio-group>
    </el-card>
    <el-card class="mt" v-for="item in alarmList" :key="item.equNo">
      <el-alert :title="`${item.address}充电站出现故障`" type="warning" :closable="false" show-icon />
      <el-descriptions :border="true" :column="4" direction="vertical" class="mt">
        <el-descriptions-item v-for="(val, key) in item" :key="key" :label="getLabel(key)">
          <el-tag v-if="key === 'level'" :type="val === 1 ? 'danger' : val === 2 ? 'warning' : 'info'">
            {{ val === 1 ? '严重' : val === 2 ? '紧急' : '一般' }}
          </el-tag>
          <el-text type="danger" v-else-if="key === 'status'">
            {{ val === 1 ? '待指派' : val === 2 ? '处理中' : '处理异常' }}
          </el-text>
          <span v-else>{{ val }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="操作">
          <el-button @click="drawer = true" :type="item.status === 2 ? 'warning' : 'primary'">{{ item.status === 1 ? '指派' : item.status === 2 ? '催办' : '查看' }}</el-button>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-drawer
      title="报警任务指派"
      v-model="drawer"
    >
      <StepForm :steps="steps" />
    </el-drawer>
  </div>
</template>

<style lang="less" scoped>
::v-deep .el-radio-button__inner:hover {
  background-color: rgb(43,137,211) !important;
  color: #fff !important;
}

::v-deep .is-active {
  .el-radio-button__inner {
    background-color: rgb(43,137,211) !important;
    color: #fff !important;
  }
}

</style>