import { post } from '@/utils/http'

interface ListType {
  page: number,
  pageSize: number,
  id?: number,
  name?: string,
  status: number,
}

const Api = {
  list: '/stationList',
} as const
type Api = typeof Api[keyof typeof Api]

function listApi(data: ListType) {
  return post(Api.list, data)
}

export { listApi }

