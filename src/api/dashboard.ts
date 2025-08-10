import { get } from '@/utils/http'

const Api = {
  ChartData: '/chartData',
  ChartData2: '/chartData2'
} as const
type Api = typeof Api[keyof typeof Api]

function chartDataApi() {
  return get(Api.ChartData)
}

function chartDataApi2() {
  return get(Api.ChartData2)
}

export { chartDataApi, chartDataApi2 }
