<script lang="ts" setup>
import { ref } from 'vue'
import { useTable } from '@/hooks/useTable'

const formData = ref({
  memberCardNumber: '',
  holderName: '',
  holderPhone: ''
})

const {tableData, loading, loadData, totals, pageInfo, handleCurrentChange, handleSizeChange} = useTable("/member", formData)

const handleReset = () => {
  formData.value = {
    memberCardNumber: '',
    holderName: '',
    holderPhone: ''
  }
}



</script>

<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model.trim="formData.memberCardNumber" placeholder="请输入会员卡号" />
        </el-col>  
        <el-col :span="6">
          <el-input v-model.trim="formData.holderName" placeholder="请输入会员姓名" />
        </el-col>
        <el-col :span="6">
          <el-input v-model.trim="formData.holderPhone" placeholder="请输入会员电话" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-table :data="tableData" v-loading="loading">
        <el-table-column type="index" label="序号" width="55" />
        <el-table-column prop="memberCardNumber" label="会员卡号" />
        <el-table-column prop="cardType" label="卡类型" />
        <el-table-column prop="issueDate" label="开卡日期" />
        <el-table-column prop="holderName" label="会员姓名" />
        <el-table-column prop="holderPhone" label="会员电话" />
        <el-table-column prop="cardBalance" label="卡余额" />
        <el-table-column prop="transactionRecords" label="消费记录">
          <template #default="scope">
            <el-popover title="消费历史" placement="left" :width="400" trigger="hover">
              <template #reference>
                <el-button type="primary">消费历史</el-button>
              </template>
              <el-table :data="scope.row.transactionRecords">
                <el-table-column width="150" property="transactionDate" label="消费日期" />
                <el-table-column width="100" property="transactionAmount" label="消费金额" />
                <el-table-column width="300" property="transactionType" label="消费类型" />
              </el-table>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="validUntil" label="有效期至" />
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