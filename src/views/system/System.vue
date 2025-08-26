<script lang="ts" setup>
import { ref } from 'vue'
import { useTable } from '@/hooks/useTable'
import AuthModal from '@/views/system/AuthModal.vue'
import { getAuthApi, deleteAuthApi, disableAuthApi } from '@/api/system'
import { ElMessage } from 'element-plus'
import type{ MenuItem } from '@/types/user'


interface SeachType {
  name: string,
  department: string
}

const searchParams = ref<SeachType>({
  name: '',
  department: ''
})

const { tableData, loading, totals, pageInfo, loadData, resetPaginstion, handleCurrentChange, handleSizeChange } = useTable('/systemList', searchParams)


//权限分配
const visible = ref<boolean>(false)

function collectUrls(tree: MenuItem[]){
  const urls: string[] = []
  function traverse(item: MenuItem){
    if(item.url && !item.children){
      urls.push(item.url)
    }
    if(item.children){
      item.children.forEach(child => {
        traverse(child)
      })
    }
  }
  tree.forEach((item: MenuItem) => {
    traverse(item)
  })
  return urls
}

const checkedKeys = ref<string[]>([])
const btnAuth = ref<string[]>([])
const accountNum = ref<string>('')
const settingAuth = async (pageAuthority: string, account: string) => {
  try {
    accountNum.value = account
    const { data:{ list, btn } } = await getAuthApi(pageAuthority)
    checkedKeys.value = collectUrls(list)
    visible.value = true
    btnAuth.value = btn

  } catch (error) {
    ElMessage.error('数据获取失败')
  }
}

const handleDelete = async (account: string) => {
  try {
    const res = await deleteAuthApi(account)
    if(res.code === 200){
      ElMessage.success(res.msg)
      loadData()
    }
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

const handleDisable = async (account: string) => {
  try {
    const res = await disableAuthApi(account)
    if(res.code === 200){
      ElMessage.success(res.msg)
      loadData()
    }
  } catch (error) {
    ElMessage.error('禁用失败')
  }
}

const resetForm = () => {
  searchParams.value = {
    name: '',
    department: ''
  }
  resetPaginstion()
}


</script>

<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model.trim="searchParams.name" placeholder="请输入姓名"/>
        </el-col>
        <el-col :span="8">
          <el-select placeholder="请选择部门" v-model.trim="searchParams.department">
            <el-option label="全部" value="" />
            <el-option label="总裁办" value="总裁办" />
            <el-option label="技术部" value="技术部" />
            <el-option label="市场部" value="市场部" />
            <el-option label="维修部" value="维修部" />
            <el-option label="运营部" value="运营部" />
            <el-option label="客服部" value="客服部" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="loadData" >查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column label="账号" prop="account" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="电话" prop="phone" />
        <el-table-column label="身份证号" prop="idNo"/>
        <el-table-column label="职位" prop="position">
          <template #default="scope"> 
            <el-tag type="primary">{{scope.row.position}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="所属部门" prop="department" />
        <el-table-column label="页面权限" prop="pageAuthority">
          <template #default="scope">
            <el-tag type="success">{{scope.row.pageAuthority}}</el-tag> 
          </template>
        </el-table-column>
        <el-table-column label="按钮权限" prop="btnAuthority">
          <template #default="scope">
            <el-tag type="info">{{scope.row.btnAuthority}}</el-tag> 
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button
              type="primary" 
              size="small" 
              @click="settingAuth(scope.row.pageAuthority, scope.row.account)"
            >权限设置</el-button>
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              icon="WarningFilled"
              icon-color="#F56C6C"
              title="确定删除当前账号权限吗?"
              @confirm="handleDelete(scope.row.account)"
            >
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              confirm-button-text="是"
              cancel-button-text="否"
              icon="WarningFilled"
              icon-color="#F56C6C"
              title="确定禁用当前账号吗?"
              @confirm="handleDisable(scope.row.account)"
            >
              <template #reference>
                <el-button type="warning" size="small">禁用</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="totals > 0"
        v-model:current-page="pageInfo.page"
        v-model:page-size="pageInfo.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :pager-count="5"
        :total="totals"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <AuthModal 
      ref="authModalRef" 
      :visible="visible"
      :checked-keys="checkedKeys"
      @close="visible = false"
      :btn-auth="btnAuth"
      :account-num="accountNum"
      @reload="loadData"
    />
  </div>
</template>

<style lang="less" scoped>

.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 5px;
}

</style>