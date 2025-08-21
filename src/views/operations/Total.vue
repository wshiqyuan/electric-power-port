<script lang="ts" setup>
import { ref, onMounted, watch, reactive } from 'vue'
import { getTreeApi } from '@/api/operation'
import { ElTree } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { totalFormApi } from '@/api/operation'
import { ElMessage } from 'element-plus'

interface Tree {
  label: string,
  children?: Tree[]
}

const filterText = ref<string>('')
const defaultProps = {
  children: 'children',
  label: 'label',
}

const treeData = ref<Tree[]>([])
const treeRef = ref<InstanceType<typeof ElTree>>()

onMounted (async () => {
  const { data } = await getTreeApi()
  treeData.value = data
})

const filterNode:any = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

// 计费模板

interface RulrFormType {
  name: string,
  service: string,
  parking: string,
  remarks?: string,
  date: Array<{
    begin: string,
    end: string,
    electricity: string
  }>

}

const title = ref<string>('')
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RulrFormType>>({
  name: [
    { required: true, message: '请输入计费模板名称', trigger: 'blur' }
  ],
  service: [
    { required: true, message: '请输入服务费', trigger: 'blur' }
  ],
  parking: [
    { required: true, message: '请输入停车费', trigger: 'blur' }
  ],
  remarks: [
    { required: false }
  ]
})
const ruleForm = ref<RulrFormType>({
  name: '',
  service: '',
  parking: '',
  remarks: '',
  date:[
    {begin: '', end: '', electricity: ''}
  ]
})

const addTimeSlot = () => {
  ruleForm.value.date.push({begin: '', end: '', electricity: ''})
}

const submitForm = async () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        const res = await totalFormApi({...ruleForm.value, name: title.value})
        if (res.code === 200) {
          ElMessage.success('操作成功')
        }
      } catch (error) {
        ElMessage.error('操作失败')
      }
    }
  })
}

const resetForm = () => {
  ruleForm.value = {
    name: '',
    service: '',
    parking: '',
    remarks: '',
    date:[
      {begin: '', end: '', electricity: ''}
    ]
  }
}

const handleNodeClick = (data: Tree) => {
  if (!data.children) {
    title.value = data.label
    resetForm()
  }
}

</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <el-input v-model.trim="filterText" style="width: 80%;" placeholder="请输入关键词">
            <template #append>
              <el-button icon="Search" />
            </template>
          </el-input>
          <el-tree 
            ref="treeRef"
            :data="treeData" 
            style="max-width: 600px;" 
            :props="defaultProps" 
            class="mt"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          ></el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <template #header>
            <div class="card-header">
              <h3>{{ title }}计费模板</h3>
            </div>
          </template>
          <el-form ref="ruleFormRef" style="width: 100%;" :model="ruleForm" :rules="rules" label-width="auto">
            <el-form-item label="计费模板名称" prop="name">
              <el-input v-model.trim="ruleForm.name" placeholder="请输入计费模板名称" style="max-width: 300px;" :disabled="!title" />
            </el-form-item>
            <el-form-item :label="`时间区间${index + 1}`" v-for="(timeSlot, index) in ruleForm.date" :key="index">
              <el-col :span="8">
                <el-form-item :prop="`date.${index}.begin`" :rules="{required: true, message: '请选择开始时间', trigger: 'blur'}">
                  <el-time-picker 
                    style="width: 100%;"
                    placeholder="选择开始时间" 
                    v-model.trim="timeSlot.begin"
                    value-format="HH:mm"
                    :disabled="!title"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="1" style="text-align: center;">
                <span>至</span>
              </el-col>
              <el-col :span="8">
                <el-form-item :prop="`date.${index}.end`" :rules="{required: true, message: '请选择结束时间', trigger: 'blur'}">
                  <el-time-picker
                    style="width: 100%;"
                    placeholder="选择结束时间" 
                    v-model.trim="timeSlot.end"
                    value-format="HH:mm"
                    :disabled="!title"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="电费/h" :prop="`date.${index}.electricity`" :rules="{required: true, message: '请输入电费', trigger: 'blur'}">
                  <el-input v-model.trim="timeSlot.electricity" placeholder="请输入电费" style="width: 100% !important;" :disabled="!title" />
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-button type="primary" class="mb" @click="addTimeSlot" :disabled="!title">添加时间区间</el-button>
            <el-form-item label="服务费/次" prop="service">
              <el-input v-model.trim="ruleForm.service" style="max-width: 200px;" :disabled="!title" />
            </el-form-item>
            <el-form-item label="停车费/h" prop="parking">
              <el-input v-model.trim="ruleForm.parking" style="max-width: 200px;" :disabled="!title" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" v-model.trim="ruleForm.remarks" :disabled="!title" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" :disabled="!title">创建</el-button>
              <el-button type="danger" @click="resetForm" :disabled="!title">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>


</style>