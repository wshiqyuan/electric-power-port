import { ref, reactive, onMounted, unref } from 'vue'
import { post } from '@/utils/http'
import { ElMessage } from 'element-plus'

export function useTable<T>(url: string, initialParams: any) {
  const tableData = ref<T[]>([])
  const loading = ref<boolean>(false)
  const totals = ref<number>(0)
  const pageInfo = reactive({
    page:1,
    pageSize:10
  })

  const loadData = async () => {
    loading.value = true
    try {
      const { data: { list, total } } = await post(url, {
        ...unref(initialParams),
        ...pageInfo
      })
      tableData.value = list
      totals.value = total
      ElMessage.success('数据请求成功')
    }catch(err) {
      console.log(err)
      ElMessage.error('数据请求失败')
    }
    loading.value = false
  }

  onMounted(() => {
    loadData()
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
    pageInfo.pageSize = 10
    loadData()
  }

  return {
    tableData,
    loading,
    totals,
    pageInfo,
    loadData,
    handleSizeChange,
    handleCurrentChange,
    resetPaginstion,
  }
}