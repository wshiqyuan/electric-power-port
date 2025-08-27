<script lang="ts" setup>
  import { ref, onBeforeUnmount, onMounted } from 'vue'
  import { useUserStore } from '@/store/auth'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { useTabsStore } from '@/store/tabs.ts'
  import avatar from '@/assets/avatar.png'
  import { useNotificationStore } from '@/store/notification'
  import { getNotice } from '@/api/personal'
  import { ElMessage } from 'element-plus'

  const tabsStore = useTabsStore()
  const { addTab,setCurrentTab } = tabsStore
  
  const greeting = ref('您好')
  
  const getGreeting = (hour: number) => {
    if (hour >= 5 && hour < 9) return '早上好'   
    if (hour < 12) return '上午好'               
    if (hour < 14) return '中午好'               
    if (hour < 18) return '下午好'               
    return '晚上好'                             
  }

  const updateTime = () => {
    const now = new Date()
    const currentHour = now.getHours()
    
    // 只在小时变化时更新问候语
    if (currentHour !== lastHour.value) {
      greeting.value = getGreeting(currentHour)
      lastHour.value = currentHour
    }
  }

  const lastHour = ref(-1)
  let timer: number
  
  // 初始化并启动定时器
  updateTime()
  timer = setInterval(() => {
    const seconds = new Date().getSeconds()
    // 每分钟的第0秒更新
    if (seconds === 0) updateTime()
  }, 1000)
  onBeforeUnmount(() => clearInterval(timer))

  const router = useRouter()
  const userStore = useUserStore()
  const { username } = storeToRefs(userStore)
  
  const handleCommand = async (command: string) => {
    if(command === 'center'){
      await router.push("/personal")
      addTab('个人中心', '/personal', 'User')
      setCurrentTab('个人中心', '/personal')
    }else if(command === 'logout'){
      userStore.logout()
      router.push("/login")
    }
  }
  
  // 消息通知
  const notificationList = ref<any[]>([])

  onMounted( async () => {
    try {
      const { data:{ notice } } = await getNotice()
      notificationList.value = notice
      totalCount.value = notice.length
    } catch (error) {
      ElMessage.error('获取通知列表失败')
    }
  })

  const notificationStore = useNotificationStore()
  const { totalCount } = storeToRefs(notificationStore)

  const handleClick = async () => {
    await router.push("/personal")
    addTab('个人中心', '/personal', 'User')
    setCurrentTab('个人中心', '/personal')
  }

</script>

<template>
  <div class="header">
    <div class="personal">
      <el-badge 
        @click="handleClick" 
        :is-dot="true" 
        :show-zero="false" 
        :value="totalCount"  
        class="per_icon"
      >
        <el-icon>
          <Bell />
        </el-icon>
      </el-badge>
      <el-avatar :src="avatar" class="ml mr"/>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ greeting }}，{{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="center" icon="User">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" icon="SwitchButton">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>  
  </div>
</template>

<style lang="less" scoped>
  .header{
    background-color: #f3f2f3;
    height: 50px;
    padding: 0 20px;
    .personal{
      float: right;
      display: flex;
      align-items: center;
      height: 50px;
      .per_icon{
        margin-top: 5px;
        cursor: pointer;
      }
    }
  }

  ::v-deep .el-dropdown-menu__item:hover {
    background-color: rgb(43,137,211) !important;
    color: #fff !important;
  }

  .el-dropdown-link:focus-visible {
    outline: none !important;
  }

  .el-dropdown-link:hover {
    cursor: pointer;
  }
</style>