<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useUserStore } from '@/store/auth'
import { storeToRefs } from 'pinia'
import { transformMenu } from '@/utils/transformMenu'

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
  }
})

const emits = defineEmits(['close'])

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
}


// 按钮权限组件
const initBtnAuth = ref<string[]>([])



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
          <el-checkbox label="全部" value="all" />
          <el-checkbox label="添加" value="add" />
          <el-checkbox label="编辑" value="edit" />
          <el-checkbox label="删除" value="delete" />
        </el-checkbox-group>
      </el-card>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>


</style>