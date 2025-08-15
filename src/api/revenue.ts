import { get, post } from '@/utils/http'
interface RevenueForm {
  name: string
  page: number
  pageSize: number
}

const Api = {
  List: '/revenue/list',
  Chart: '/revenue/chart',
  Form: '/revenue/form'
} as const
type Api = typeof Api[keyof typeof Api]

function listApi() {
  return get(Api.List)
}

function chartApi() {
  return get(Api.Chart)
}

function fromApi(data: RevenueForm) {
  return post(Api.Form, data)
}

export { listApi, chartApi, fromApi }