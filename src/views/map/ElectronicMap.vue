<script lang="ts" setup>
import MapContain from '@/components/map/MapContain.vue'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type{ FormRules, FormInstance } from 'element-plus'
import { postStationApi } from '@/api/map'

const detailData: any = [
  {id: 1, name: '累计充电站数量', context: 34},
  {id: 2, name: '单省份最多充电桩', context: "广州"},
  {id: 3, name: '充电站遍及省份', context: 22},
  {id: 4, name: '暂无充电桩省份', context: 12},
  {id: 5, name: '累计充电桩', context: 2031},
  {id: 6, name: '单日营收最高', context: "深圳大梅沙充电站"},
  {id: 7, name: '单日营收最低', context: "贵阳甲秀楼充电站"},
  {id: 8, name: '故障率最高', context: "兰州黄河桥充电站"}
]

const form = reactive<any>({
  name: '',
  region: '',
  longitude: '',
  latitude: '',
  isUse: '',
  remark: ''
})

const resetForm = () => {
  form.name = ''
  form.region = ''
  form.longitude = ''
  form.latitude = ''
  form.isUse = ''
  form.remark = ''
}

const rules = reactive<FormRules<any>>({
  name: [{ required: true, message: '请输入站点名称', trigger: 'blur' }],
  region: [{ required: true, message: '请输入站点地址', trigger: 'blur' }],
  longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
  latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }],
})

const formRef = ref<FormInstance>()
const updataLoading = ref<boolean>(false)

const addStation = async() => {
  if (!form.name || !form.region || !form.longitude || !form.latitude) {
    ElMessage.error('请填写完整信息')
    return
  }
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      updataLoading.value = true
      try {
        await postStationApi(form)
        ElMessage.success('新增成功')
        resetForm()
        updataLoading.value = false
      } catch (error:any) {
        ElMessage.error(error.message)
        updataLoading.value = false
      }
    }
  })
}

</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <MapContain />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="map-card">
          <template #header>
            <div class="card-header">
              <h4>站点信息</h4>
            </div>
          </template>
          <div v-for="item in detailData" :key="item.id">{{ `${item.id}.${item.name}` }}：<el-text type="primary">{{ item.context }}</el-text></div>
        </el-card>
        <el-card class="mt" v-permission="['admin']">
          <template #header>
            <div class="card-header">
              <h3>新增站点地图</h3>
            </div>
          </template>
          <el-form ref="formRef" :rules="rules" :model="form" style="max-width: 600px;" label-width="85px">
            <el-form-item label="站点名称">
              <el-input placeholder="请输入站点名称" v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="站点地址">
              <el-input placeholder="请输入站点地址" v-model.trim="form.region"></el-input>
            </el-form-item>
            <el-form-item label="经度">
              <el-input placeholder="请输入经度" v-model.trim="form.longitude"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
              <el-input placeholder="请输入纬度" v-model.trim="form.latitude"></el-input>
            </el-form-item>
            <el-form-item label="立即使用">
              <el-switch v-model="form.isUse" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input placeholder="请输入备注" type="textarea" v-model.trim="form.remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="updataLoading" @click="addStation">创建</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.map-card {
  line-height: 35px;  
}

::v-deep .amap-copyright, ::v-deep .amap-logo {
  display: none !important;
  visibility: hidden !important;
}

</style>