<script lang="ts" setup>
  import { ref, onBeforeUnmount } from 'vue'
  import { useUserStore } from '@/store/auth'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'

  const info = ref(5)
  
  // 优化后的时间逻辑
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
  
  const handleCommand = (command: string) => {
    if(command === 'center'){
      router.push("/personal")
    }else if(command === 'logout'){
      userStore.logout()
      router.push("/login")
    }
  }


</script>

<template>
  <div class="header">
    <div class="personal">
      <el-badge :is-dot="info > 0" class="per_icon">
        <el-icon>
          <Bell />
        </el-icon>
      </el-badge>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" class="ml mr"/>
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
      }
    }
  }

</style>