<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { transformMenu } from '@/utils/transformMenu'
import { setAuthApi } from '@/api/system'
import { ElMessage } from 'element-plus'

// 页面权限组件
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  checkedKeys: {
    type: Array,
    required: true,
  },
  btnAuth: {
    type: Array,
    required: true,
  },
  accountNum: {
    type: String,
    required: true,
  }
})

const emits = defineEmits(['close', 'reload'])

const userStore = useUserStore()
const { menu } = storeToRefs(userStore)

const treeData = ref(transformMenu(menu.value))

const treeRef = ref()

const handleOpen = () => {
  treeRef.value.setCheckedKeys(props.checkedKeys)
  initBtnAuth.value = props.btnAuth as string[]
}

const handleClose = () =>{
  emits('close')
  emits('reload')
}


// 按钮权限组件
const initBtnAuth = ref<string[]>([])


// 提交表单


const updataLoading = ref<boolean>(false)

const handleConfirm = async() => {
  try{
    updataLoading.value = true
    const res = await setAuthApi(props.accountNum, treeRef.value.getCheckedKeys(true), initBtnAuth.value)
    console.log(res)
    updataLoading.value = false
    if(res.code === 200){
      ElMessage.success("权限设置成功")
      updataLoading.value = false
      handleClose()
    }
  }catch(err){
    console.log("权限设置失败",err)
    ElMessage.error("权限设置失败")
  }
}


</script>

<template>
  <div>
    <el-dialog title="权限分配" width="600px" :model-value="visible" @open="handleOpen" @close="handleClose">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>页面权限</span>
          </div>
        </template>
        <el-tree
          ref="treeRef"
          style="max-width: 600px"
          :data="treeData"
          node-key="url"
          show-checkbox
        />
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <span>按钮权限</span>
          </div>
        </template>
        <el-checkbox-group v-model="initBtnAuth">
          <el-checkbox label="添加" value="add" />
          <el-checkbox label="编辑" value="edit" />
          <el-checkbox label="删除" value="delete" />
        </el-checkbox-group>
      </el-card>
      <template #footer>
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" :loading="updataLoading" @click="handleConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>


</style>