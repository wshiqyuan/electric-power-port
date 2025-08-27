<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import type { FormRules } from 'element-plus'
import type { RowType } from '@/types/station'
import { useStationStore } from '@/store/station'
import { storeToRefs } from 'pinia'

const ruleForm = ref<RowType>({
  name:'',
  id:'',
  city:'',
  fast:'',
  slow:'',
  status: 3,
  now:'',
  fault:'',
  person:'',
  tel:''
})

const rules = reactive<FormRules<RowType>>({
  name: [
    { required: true, message: '请输入站点名称', trigger: 'blur' }
  ],
  id: [
    { required: true, message: '请输入站点id', trigger: 'blur' }
  ],
  city: [
    { required: true, message: '请输入所属城市', trigger: 'blur' }
  ],
  fast: [
    { required: true, message: '请输入快充数', trigger: 'blur' }
  ],
  slow: [
    { required: true, message: '请输入慢充数', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择充电站状态', trigger: 'blur' }
  ],
  now: [
    { required: true, message: '请输入正在充电', trigger: 'blur' }
  ],
  fault: [
    { required: true, message: '请输入故障数', trigger: 'blur' }
  ],
  person: [
    { required: true, message: '请输入站点负责人', trigger: 'blur' }
  ],
  tel: [
    { required: true, message: '请输入负责人手机号', trigger: 'blur' }
  ]
})

  const title = ref<string>('')
  const emit = defineEmits(['close:dialogVisible', 'reload'])

  const stationStore = useStationStore()
  const { rowData } = storeToRefs(stationStore)

  const disabled = ref(false)

  const props = defineProps({
    dialogVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  })

  const handleCancel = () => {
    emit('close:dialogVisible', false)
  }

  watch(() => props.dialogVisible, () => {
    if (rowData.value.id) {
      title.value = '编辑充电站'
      disabled.value = true
    } else {
      title.value = '新增充电站'
      disabled.value = false
    }
    ruleForm.value = rowData.value
  })

  import { editApi } from '@/api/chargingstation'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'

  const formRef = ref<FormInstance | null>(null)

  const handleSubmit = () => {
    formRef.value?.validate( async (vaild:boolean) => {
      if (vaild) {
        const res = await editApi(ruleForm.value)
        if (res.code === 200) {
          ElMessage.success(res.data)
          handleCancel()
          emit('reload')
        } else {
          ElMessage.error('编辑失败')
        }
      }
    })
  }

</script>

<template>
    <el-dialog
    :title="title"
    :model-value="props.dialogVisible"
    @close="handleCancel"
    destroy-on-close
    >
    <el-form 
      label-width="120"
      :rules="rules"
      :model="ruleForm"
      label-position="left"
      ref="formRef"
    >
      <el-row>
        <el-col :span="12" style="padding-right: 20px;">
          <el-form-item label="站点名称:" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>          
          <el-form-item label="站点id:" prop="id">
            <el-input :disabled="disabled" v-model="ruleForm.id" />
          </el-form-item>          
          <el-form-item label="所属城市:" prop="city">
            <el-input v-model="ruleForm.city" />
          </el-form-item>          
          <el-form-item label="站点负责人:" prop="person">
            <el-input v-model="ruleForm.person" />
          </el-form-item>          
          <el-form-item label="负责人手机号:" prop="tel">
            <el-input v-model="ruleForm.tel" />
          </el-form-item>          
        </el-col>
        <el-col :span="12">
          <el-form-item label="快充数:" prop="fast">
            <el-input v-model="ruleForm.fast" />
          </el-form-item>          
          <el-form-item label="慢充数:" prop="slow">
            <el-input v-model="ruleForm.slow" />
          </el-form-item>          
          <el-form-item label="充电站状态:" prop="status">
            <el-select :disabled="disabled" v-model="ruleForm.status" placeholder="请选择">
              <el-option label="使用中" :value="2" />
              <el-option label="空闲中" :value="3" />
              <el-option label="维护中" :value="4" />
              <el-option label="待维修" :value="5" />
            </el-select>
          </el-form-item>          
          <el-form-item label="正常使用数:" prop="now">
            <el-input :disabled="disabled" v-model="ruleForm.now" />
          </el-form-item>          
          <el-form-item label="故障数:" prop="fault">
            <el-input :disabled="disabled" v-model="ruleForm.fault" />
          </el-form-item> 
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer" style="margin-bottom: 5px;">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>


</style>