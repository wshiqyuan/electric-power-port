<script lang="ts" setup>
import free from '@/assets/free.png'
import charging from '@/assets/ing.png'
import outLine from '@/assets/outline.png'
import { currentListApi } from '@/api/manage'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { computed, watch } from 'vue'

const options = ref<any>([])

const filterList = ref<any>([])
const value = ref<string>('')
const dataList = ref<any>([])
const activities  = ref<any>([])
const loadData = async() => {
  try{
    const { data } =  await currentListApi()
    options.value = data
    dataList.value = data[0].list
    filterList.value = data[0].list
   activities.value = options.value[0].list[0].record
  }catch(error: any){
    console.log(error)
    ElMessage.error('请求失败')
  }
}
onMounted(() => {
  loadData()
})

const checkCount = (num: number) => {
  return dataList.value.filter((item: any) => item.status === num).length
}
const allCount = computed(() => checkCount(1) + checkCount(2) + checkCount(3) + checkCount(4) + checkCount(5) + checkCount(6))

const radio = ref<number>(0)

const handleChange = () => {
  filterList.value = dataList.value  
  if (radio.value !== 0 ){
    filterList.value = filterList.value.filter((item: any) => item.status === radio.value)
  }
}

watch(value, (newValue) =>{
  filterList.value = options.value.filter((item: any) => item.name === newValue)[0].list
  dataList.value = filterList.value
  radio.value = 0
})

const gridData = [
  {
    date: '2025-08-7',
    name: '张伟',
    detail: '已完成',

  },
  {
    date: '2025-08-14',
    name: '王强',
    detail: '已完成',
  },
  {
    date: '2025-08-21',
    name: '张伟',
    detail: '已完成',
  },
  {
    date: '2025-08-28',
    name: '王强',
    detail: '已完成',
  },
]


</script>

<template>
  <el-card>
    <el-select style="width: 300px" placeholder="选择站点名称" v-model="value" filterable no-match-text="无匹配项" no-data-text="暂无数据">

      <el-option v-for="item in options" :key="item.id" :value="item.name" :label="item.name" ></el-option>
    </el-select>
  </el-card>
  <el-card class="mt">
    <el-radio-group size="large" v-model="radio" @change="handleChange">
    <el-radio-button :label="`全部(${allCount})`" :value="0" />
    <el-radio-button :label="`空闲中(${checkCount(1)})`" :value="1" />
    <el-radio-button :label="`充电中(${checkCount(2)})`" :value="2" />
    <el-radio-button :label="`连接中(${checkCount(3)})`" :value="3" />
    <el-radio-button :label="`排队中(${checkCount(4)})`" :value="4" />
    <el-radio-button :label="`已预约(${checkCount(5)})`" :value="5" />
    <el-radio-button :label="`故障/离线(${checkCount(6)})`" :value="6" />
  </el-radio-group>
  </el-card>
  <el-card class="mt">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in filterList" :key="item.id">
        <div class="item">
          <div class="pic">
            <p v-if="item.status === 1" class="p-free">空闲中</p>
            <p v-if="item.status === 2" class="p-ing">充电中</p>
            <p v-if="item.status === 3" class="p-free">连接中</p>
            <p v-if="item.status === 4" class="p-ing">排队中</p>
            <p v-if="item.status === 5" class="p-ing">已预约</p>
            <p v-if="item.status === 6" class="p-outline">故障/离线</p>
            <img v-if="item.status === 1 || item.status === 3" :src="free" style="width: 100px;">
            <img v-if="item.status === 2 || item.status === 4 || item.status === 5" :src="charging" style="width: 100px;">
            <img v-if="item.status === 6" :src="outLine" style="width: 100px;">
            <p v-if="item.status === 2 " class="p-ing">{{ item.percent }}</p>
            <p v-if="item.status === 6" class="p-outline">0%</p>            
            <p v-if="item.status === 4 || item.status === 5" class="p-ing">0%</p>
            <p v-if="item.status === 1 || item.status === 3" class="p-free">0%</p>
          </div>
          <div class="info">
            <h3>{{ item.id }}</h3>
            <hr class="mb">
            <p>电压：{{ item.voltage }}</p>
            <p>电流：{{ item.current }}</p>
            <p>功率：{{ item.power }}</p>
            <p>温度：{{ item.tem }}</p>
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
              <el-popover placement="top" :width="350" trigger="click">
                <template #reference>
                  <el-button size="small">维保记录</el-button>
                </template>
                <el-table :data="gridData">
                  <el-table-column width="150" property="date" label="日期" />
                  <el-table-column width="100" property="name" label="负责人" />
                  <el-table-column width="300" property="detail" label="完成情况" />
                </el-table>
              </el-popover>
                <el-popover placement="right" :width="300" trigger="click">
                <template #reference>
                  <el-button size="small" type="primary">使用记录</el-button>
                </template>
                <h3 class="mb">使用记录</h3>
                <el-timeline style="max-width: 600px">
                  <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :timestamp="activity.time"
                    :hollow="true"
                    type="primary"
                  >
                    {{ activity.msg }}
                  </el-timeline-item>
                </el-timeline>  
              </el-popover>
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

::v-deep .is-active {
  .el-radio-button__inner {
    background-color: rgb(43,137,211) !important;
    color: #fff !important;
  }
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

.p-free{
  color: rgb( 102, 187, 86);
}
.p-ing {
  color: rgb( 61, 187, 146);
}
.p-outline {
  color: rgb( 192,192,191);
}
</style>