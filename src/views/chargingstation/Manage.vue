<script lang="ts" setup>
import free from '@/assets/free.png'
import { currentListApi } from '@/api/manage'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

const options = ref<any>([])

const value = ref('')
const loadData = async() => {
  try{
    const { data } =  await currentListApi()
    options.value = data
  }catch(error: any){
    console.log(error)
    ElMessage.error('请求失败')
  }
}
onMounted(() => {
  loadData()
})


</script>

<template>
  <el-card>
    <el-select style="width: 300px" placeholder="选择站点名称" v-model="value" filterable no-match-text="无匹配项" no-data-text="暂无数据">
      <el-option v-for="item in options" :key="item.id" :value="item.name" :label="item.name" ></el-option>
    </el-select>
  </el-card>
  <el-card class="mt">
    <el-radio-group size="large">
    <el-radio-button label="全部" :value="0" />
    <el-radio-button label="空闲中" :value="1" />
    <el-radio-button label="充电中" :value="2" />
    <el-radio-button label="连接中" :value="3" />
    <el-radio-button label="排队中" :value="4" />
    <el-radio-button label="已预约" :value="5" />
    <el-radio-button label="故障/离线" :value="6" />
  </el-radio-group>
  </el-card>
  <el-card class="mt">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="item">
          <div class="pic">
            <p>空闲中</p>
            <img :src="free" style="width: 100px;">
            <p>80%</p>
          </div>
          <div class="info">
            <h3>CD101</h3>
            <hr class="mb">
            <p>电压：220V</p>
            <p>电流：10A</p>
            <p>功率：2.2kW</p>
            <p>温度：25℃</p>
          </div>
        </div>
        <div class="btn">
          <div class="divder"></div>
          <div>
            <p 
              class="fl ml"
              style="font-size: 12px; color: #999;"
            >
              暂无预警
            </p>
            <div class="fr mr" style="text-align: right;">
              <el-button size="small">维保记录</el-button>
              <el-button size="small" type="primary">使用记录</el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="less" scoped>
::v-deep .el-radio-button__inner:hover {
  background-color: rgb(43,137,211) !important;
  color: #fff !important;
}

.item{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: rgb(247, 251, 254);
  padding: 20px;
  border-radius: 10px 10px 0 0;
  margin-top: 20px;
  .pic{
    p{
      width: 76px;
      text-align: center;
      color: rgb(61, 187, 146);
    }
  }
  .info{
    color: #999;
    margin-left: 30px;
    line-height: 26px;
    margin-top: -10px;
  }
}
.btn{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #f7fbfe;
  .divder{
    background-color: #f3f4f3;
    height: 2px;
    width: 95%;
    margin: auto;
  }
}

</style>