import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MenuItem } from '@/types/user'

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref<MenuItem[]>([])
  const currentTab = ref<{name: string, url: string}>({name:'数据看板', url:'/dashboard'})

  const addTab = (name: string, url: string, icon: string) => {
    if(!tabs.value.some((tab) => tab.url === url)){
      tabs.value.push({
        name,
        url,
        icon
      })
    }
  }
  const setCurrentTab = (name: string, url: string) => {
    currentTab.value = {name, url}
  }

  const removeTab = (name: string) => {
    const index = tabs.value.findIndex((tab) => tab.name === name)
    tabs.value = tabs.value.filter((tab) => tab.name !== name)
    
    if (name === currentTab.value.name) {
      if (tabs.value.length > 0) {
        if (index === 0) {
          currentTab.value = tabs.value[0]
        } else {
          currentTab.value = tabs.value[index - 1]
        }
      } else {
        setCurrentTab('数据看板', '/dashboard')
        addTab('数据看板', '/dashboard', 'DataLine')
      }
    }
  }


  return {
    tabs,
    currentTab,
    addTab,
    setCurrentTab,
    removeTab
  }
})
