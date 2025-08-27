import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import './mock'
import './router/guard'
import permission from './directives/permission'

const app = createApp(App)
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.directive('permission', permission)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(pinia)
app.use(router)
app.mount('#app')
