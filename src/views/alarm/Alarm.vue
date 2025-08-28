<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAlarmList } from '@/api/alarm'
import type { AlarmList } from '@/types/alarm'
import { ElMessage } from 'element-plus'
import { getLabel } from './fieldLabelMap'
import StepForm from '@/components/stepForm/StepForm.vue'
import type{ FormInstance } from 'element-plus'
import { assignAlarm } from '@/api/alarm'

const topRadio = ref<number>(0)
const alarmList = ref<AlarmList[]>([])
const filterList = ref<AlarmList[]>([])

const loading = ref<boolean>(false)

const loadingData = async () => {
  loading.value = true
  try {
    const { data } = await getAlarmList()
    alarmList.value = data
    filterList.value = data
    loading.value = false
  } catch (error) {
    ElMessage.error('获取告警列表失败')
    loading.value = false
  }
} 

onMounted( async() => {
  await loadingData()
})

const drawerData = ref<any>({
  status: 0,
  equNo: ''
})

const tipShow = ref<boolean>(true)

const handleDrawer = (status: number, equNo: string) => {
  drawerData.value.status = status
  drawerData.value.equNo = equNo
  drawer.value = true
  tipShow.value = true
}

const handleChange = () => {
  filterList.value = alarmList.value
  if (topRadio.value !== 0) {
    filterList.value = filterList.value.filter((item: any) => item.level === topRadio.value)
  }

}


// 抽屉模块
const drawer = ref<boolean>(false)
const steps = [
  { title: '基本信息' },
  { title: '审批信息' },
  { title: '负责人信息' }
]

const formData = ref<any>({
  basicInfo: {
    name: '',
    email: '',
    phone: '',
    jobNumber: '',
    urgent: true,
    other: [],
    remark: ''
  },
  approvalInfo: {
    approvalDepartment: '',
    CCDepartment: '',
  },
  managerInfo: {
    person: '',
    phone: '',
  }

})

const basicInfoRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  jobNumber: [
    { required: true, message: '请输入工号', trigger: 'blur' }
  ]
}

const basicFormRef = ref<FormInstance>()

const approvalInfoRules = {
  approvalDepartment: [
    { required: true, message: '请选择审批部门', trigger: 'blur' }
  ],
  CCDepartment: [
    { required: true, message: '请选择抄送部门', trigger: 'blur' }
  ]
}

const approvalFormRef = ref<FormInstance>()

const managerInfoRules = {
  person: [
    { required: true, message: '请输入负责人姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入负责人电话', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ]
}

const managerFormRef = ref<FormInstance>()

const handleSubmit = async () => {
  try {
    const { data } = await assignAlarm(formData.value)
    ElMessage.success(data)
    formData.value = {
      basicInfo: {
        name: '',
        email: '',
        phone: '',
        jobNumber: '',
        urgent: true,
        other: [],
        remark: ''
      },
      approvalInfo: {
        approvalDepartment: '',
        CCDepartment: '',
      },
      managerInfo: {
        person: '',
        phone: '',
      }
    }
    drawer.value = false
    await loadingData()
  } catch (error) {
    ElMessage.error('指派失败')
  }
}

</script>

<template>
  <div>
    <el-card>
      <el-radio-group @change="handleChange" v-model="topRadio" size="large">
        <el-radio-button label="严重告警" :value="1"></el-radio-button>
        <el-radio-button label="紧急告警" :value="2"></el-radio-button>
        <el-radio-button label="一般告警" :value="3"></el-radio-button>
      </el-radio-group>
    </el-card>
    <div v-loading="loading">
      <el-card class="mt" v-for="item in filterList" :key="item.equNo">
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
            <el-button 
              @click="handleDrawer(item.status, item.equNo)" 
              :type="item.status === 1 ? 'primary' : item.status === 2 ? 'warning' : 'danger'"
            >
              {{ item.status === 1 ? '指派' : item.status === 2 ? '催办' : '查看' }}
            </el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <el-drawer
      title="报警任务指派"
      v-model="drawer"
      v-if="drawer"
    >
      <StepForm @submit="handleSubmit" :steps="steps" :FormRef1="basicFormRef" :FormRef2="approvalFormRef" :FormRef3="managerFormRef">
        <template #step-1>
          <el-form :model="formData.basicInfo" :rules="basicInfoRules" ref="basicFormRef">
            <el-form-item label="姓名" prop="name">
              <el-input v-model.trim="formData.basicInfo.name" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model.trim="formData.basicInfo.email" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model.trim="formData.basicInfo.phone" />
            </el-form-item>
            <el-form-item label="工号" prop="jobNumber">
              <el-input v-model.trim="formData.basicInfo.jobNumber" />
            </el-form-item>
            <el-form-item label="是否紧急">
              <el-switch v-model="formData.basicInfo.urgent" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
            <el-form-item label="其他">
              <el-checkbox-group v-model="formData.basicInfo.other">
                <el-checkbox value="1" >更换设备</el-checkbox>
                <el-checkbox value="2">仅维修</el-checkbox>
                <el-checkbox value="3">需拍照</el-checkbox>
                <el-checkbox value="4">需报备</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model.trim="formData.basicInfo.remark" />
            </el-form-item>
          </el-form>
        </template>
        <template #step-2>
          <el-form ref="approvalFormRef" :rules="approvalInfoRules" :model="formData.approvalInfo" :FormRef2="approvalFormRef">
            <el-form-item label="审批部门" prop="approvalDepartment">
              <el-select placeholder="请选择审批部门" v-model="formData.approvalInfo.approvalDepartment">
                <el-option label="总裁办" value="1"></el-option>
                <el-option label="运营部" value="2"></el-option>
                <el-option label="维修部" value="3"></el-option>
                <el-option label="市场部" value="4"></el-option>
                <el-option label="财务部" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="抄送部门" prop="CCDepartment">
              <el-select placeholder="请选择抄送部门" v-model="formData.approvalInfo.CCDepartment">
                <el-option label="总裁办" value="1"></el-option>
                <el-option label="运营部" value="2"></el-option>
                <el-option label="维修部" value="3"></el-option>
                <el-option label="市场部" value="4"></el-option>
                <el-option label="财务部" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <template #step-3>
          <el-form ref="managerFormRef" :model="formData.managerInfo" :rules="managerInfoRules">
            <el-form-item label="负责人" prop="person">
              <el-input v-model.trim="formData.managerInfo.person" />
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model.trim="formData.managerInfo.phone" />
            </el-form-item>
          </el-form>
        </template>
      </StepForm>
      <el-result
        v-show="tipShow"
        icon="warning"
        :title="`设备编号：${drawerData.equNo}`"
        :sub-title="`${drawerData.status === 1 ? '待指派,请尽快派人处理' : drawerData.status === 2 ? '已派发表单，正在催促处理中' : '处理异常，请派专人前往指导'}`"
      >
        <template #extra>
          <el-button type="primary" @click="tipShow = false">我已知晓</el-button>
        </template>
      </el-result>
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