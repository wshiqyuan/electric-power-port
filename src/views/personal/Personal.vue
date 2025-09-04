<script lang="ts" setup>
import avatar from '@/assets/avatar.png'
import { getInfo } from '@/api/personal'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import StepForm from '@/components/stepForm/StepForm.vue'
import type{ FormInstance } from 'element-plus'
import { submitChangeInfo } from '@/api/personal'
import { getNotice } from '@/api/personal'
import { useNotificationStore } from '@/store/notification'


// 个人信息
const infoList = ref<any>([])
const dateValue = ref(new Date())

const loadingPersonalData = async () => {
  try{
    const { data } = await getInfo()
    infoList.value = data
  }catch(error){
    ElMessage.error('获取个人信息失败')

  }
}

onMounted(async () => {
  await loadingPersonalData()
})

// 修改个人信息
const steps = [
  { title: '基本信息' },
  { title: '在职信息' }
]

const FormRef1 = ref<FormInstance>()
const FormRef2 = ref<FormInstance>()


const formData = ref({
  basicInfo: {
    name: '',
    phone: '',
    address: ''
  },
  workInfo: {
    status: '',
  }
})

const handleSubmit = async() => {
  try{
    const res = await submitChangeInfo(formData.value)
    formData.value = {
      basicInfo: {
        name: '',
        phone: '',
        address: ''
      },
      workInfo: {
        status: '',
      }
    }
    if(res.code === 200){
      ElMessage.success('提交个人信息成功')
      loadingPersonalData()
    }
  }catch(error){
    ElMessage.error('提交个人信息失败')
  }
}

// 消息通知
const noticeList = ref<any>([])
const infoTypeList = ref<any>([])
const noticeListCopy = ref<any>([])
const notificationStore = useNotificationStore()

const loading = ref(false)


onMounted(async () => {
  loading.value = true
  try{
    const { data:{ notice,infoType } } = await getNotice()
    noticeList.value = notice
    noticeListCopy.value = noticeList.value
    infoTypeList.value = infoType
    notificationStore.setTotalCount(notice.length)
    loading.value = false
  }catch(error){
    ElMessage.error('获取消息通知失败')
    loading.value = false
  }
})

const handleClick = (type: string) => {
  noticeList.value = noticeListCopy.value
  noticeList.value = noticeList.value.filter((item: any) => item.type === type)
}

const handleRead = (title: string, type: string) => {
  noticeList.value = noticeList.value.filter((item: any) => item.title !== title)
  noticeListCopy.value = noticeListCopy.value.filter((item: any) => item.title !== title)
  const infoItem = infoTypeList.value.findIndex((item: any) => item.type === type)
  if (infoTypeList.value[infoItem].count) {
    infoTypeList.value[infoItem].count--
    notificationStore.setTotalCount(noticeListCopy.value.length)
  }
}



</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-descriptions
            direction="vertical"
            border
          >
            <el-descriptions-item
              :rowspan="2"
              :width="140"
              label="头像"
              align="center"
            >
              <el-image
                style="width: 100px; height: 100px"
                :src="avatar"
              />
            </el-descriptions-item>
            <el-descriptions-item label="姓名">{{ infoList.name }}</el-descriptions-item>
            <el-descriptions-item label="电话">{{ infoList.phone }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ infoList.address }}</el-descriptions-item>
            <el-descriptions-item label="个人标签">
              <el-tag size="small" type="primary" class="mr" v-for="item in infoList.personalTag" :key="item">{{ item }}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <el-card class="mt">
          <template #header>
            <div class="card-header">
              <span>日历</span>
            </div>
          </template>
          <el-calendar v-model="dateValue" />
        </el-card>
        <el-card class="mt">
          <template #header>
            <div class="card-header">
              <span>修改个人资料</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="16">
              <StepForm :steps="steps" :FormRef1="FormRef1" :FormRef2="FormRef2" @submit="handleSubmit">
                <template #step-1>
                  <el-form :model="formData.basicInfo" ref="FormRef1">
                    <el-form-item label="姓名">
                      <el-input v-model.trim="formData.basicInfo.name" />
                    </el-form-item>
                    <el-form-item label="电话">
                      <el-input v-model.trim="formData.basicInfo.phone" />
                    </el-form-item>
                    <el-form-item label="地址">
                      <el-input v-model.trim="formData.basicInfo.address" />
                    </el-form-item>
                  </el-form>
                </template>
                <template #step-2>
                  <el-form :model="formData.workInfo" ref="FormRef2">
                      <el-select placeholder="请选择在职状态" v-model="formData.workInfo.status">
                        <el-option label="工作中" value="1" />
                        <el-option label="请假中" value="2" />
                        <el-option label="出差中" value="3" />
                        <el-option label="年假中" value="4" />
                      </el-select>
                  </el-form>
                </template>
              </StepForm>
            </el-col>
            <el-col :span="8">
              <div class="changeInfoTitle mt">
                <h1>资料完善度</h1>
                <el-progress type="circle" :percentage="100" />
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card v-loading="loading">
          <el-badge :hidden="item.count === 0" :value="item.count" class="item mr" v-for="item in infoTypeList" :key="item.type">
            <el-button @click="handleClick(item.type)">{{ item.type }}</el-button>
          </el-badge>
        </el-card>
        <el-card class="mt" v-loading="loading">
          <el-collapse v-show="noticeList.length > 0">
            <el-collapse-item :title="item.title" v-for="(item,index) in noticeList" :key="index">
              <div style="display: flex; justify-content: space-between;">
                <h3>{{ item.content }}</h3>
                <p>{{ item.time }}</p>
                <el-button type="primary" @click="handleRead(item.title, item.type)">已知晓</el-button>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div v-show="noticeList.length === 0" style="text-align: center;">
            <h3>暂无消息</h3>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.changeInfoTitle {
  display: flex; 
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  h1{
    margin-bottom: 40px;
  }
}

.el-button:hover{
  background-color: rgb(43,137,211) !important;
  color: #fff !important;
}

</style>