import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RowType } from '@/types/station'

export const useStationStore = defineStore('station',() => {
  const rowData = ref<RowType>({
    name: '',
    status: 0,
    fault: '',
    id: '',
    city: '',
    fast: '',
    slow: '',
    now: '',
    person: '',
    tel: '',
  })

  const setRowData = (data: RowType) => {
    rowData.value = data
  }

  const clearRowData = () => {
    rowData.value = {
      name: '',
      status: 3,
      fault: '',
      id: '',
      city: '',
      fast: '',
      slow: '',
      now: '',
      person: '',
      tel: '',
    }
  }


  return {
    rowData,
    setRowData,
    clearRowData
  }

})