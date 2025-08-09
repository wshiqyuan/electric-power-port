import type { Ref } from 'vue'
import { ref, onMounted, onUnmounted, markRaw } from 'vue'
import * as echarts from 'echarts'

export function useChart( chartRef: Ref<HTMLElement | null>, initialOptions: any){
  const chartInstance = ref<echarts.ECharts | null>(null)
  const chartOptions = ref<any>(initialOptions)

  const initChart = () => {
    if (chartRef.value) {
      chartInstance.value = markRaw(echarts.init(chartRef.value))
      chartInstance.value.setOption(chartOptions.value)
    }
  }
  const resizeChart = () => {
    chartInstance.value?.resize()
  }

  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })

  // 释放内存
  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    if (chartInstance.value) {
      chartInstance.value.dispose()
    }
  })
}
