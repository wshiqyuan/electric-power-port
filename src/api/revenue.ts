import { get } from '@/utils/http'

const Api = {
  List: '/revenue/list',
} as const
type Api = typeof Api[keyof typeof Api]

function listApi() {
  return get(Api.List)
}

export { listApi }