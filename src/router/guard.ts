import router from './index'
import { useUserStore } from '@/store/auth'

router.beforeEach((to, ) => {
  const userStore = useUserStore()
  const isLogin = userStore.token
  if(!isLogin) {
    if(to.path !== '/login'){
      router.push('/login')
    }
  } else{
    if(to.path === '/login'){
      router.push('/')
    }
  }
})