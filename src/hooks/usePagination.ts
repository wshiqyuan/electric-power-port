import { ref, reactive } from "vue"

export function usePagination(loadData: () => Promise<any>, initalPageSize = 10) {
  const total = ref<number>(0)

  const pageInfo = reactive({
    page: 1,
    pageSize: initalPageSize
  }) 

  const handleSizeChange = (val: number) => {
    pageInfo.pageSize = val
    loadData()
  }

  const handleCurrentChange = (val: number) => {
    pageInfo.page = val
    loadData()
  }

  const resetPaginstion = () => {
    pageInfo.page = 1
    pageInfo.pageSize = initalPageSize
    loadData()
  }

  const setTotal = (val: number) => {
    total.value = val
  }

  return {
    total,
    pageInfo,
    handleSizeChange,
    handleCurrentChange,
    resetPaginstion,
    setTotal

  }
}