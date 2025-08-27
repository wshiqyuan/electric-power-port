import { defineStore } from 'pinia'

const useNotificationStore = defineStore('notification', {
  state: () => ({
    totalCount: 0
  }),
  actions: {
    setTotalCount(count: number) {
      this.totalCount = count
    }
  }
})

export { useNotificationStore }
