<script lang="ts" setup>
import MapContain from '@/components/map/MapContain.vue'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type{ FormRules, FormInstance } from 'element-plus'
import { postStationApi } from '@/api/map'

const detailData: any = {
  stationsCount: 34,
  provinceMost: "广州",
  provinceCount: 22,
  plugCount: 2031,
  highestRevenue: "深圳大梅沙充电站",
  lowestRevenue: "贵阳甲秀楼充电站",
  highestFailureRate: "兰州黄河桥充电站",
}

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

const addStation = async() => {
  if (!form.name || !form.region || !form.longitude || !form.latitude) {
    ElMessage.error('请填写完整信息')
    return
  }
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      try {
        await postStationApi(form)
        ElMessage.success('新增成功')
        resetForm()
      } catch (error:any) {
        ElMessage.error(error.message)
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
          <div>1.累计充电站数量：<el-text type="primary">{{ detailData.stationsCount }}个</el-text></div>
          <div>2.单省份最多充电桩：<el-text type="primary">{{ detailData.provinceMost }}</el-text></div>
          <div>3.充电站遍及省份：<el-text type="primary">{{ detailData.provinceCount }}个</el-text></div>
          <div>4.暂无充电站省份：<el-text type="primary">{{ 34 - detailData.provinceCount }}个</el-text></div>
          <div>5.累计充电桩：<el-text type="primary">{{ detailData.plugCount }}个</el-text></div>
          <div>6.单日营收最高：<el-text type="primary">{{ detailData.highestRevenue }}</el-text></div>
          <div>7.单日营收最低：<el-text type="primary">{{ detailData.lowestRevenue }}</el-text></div>
          <div>8.故障率最高：<el-text type="primary">{{ detailData.highestFailureRate }}</el-text></div>
        </el-card>
        <el-card class="mt">
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
              <el-button type="primary" @click="addStation">创建</el-button>
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

</style>