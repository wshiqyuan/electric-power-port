import { get, post } from '@/utils/http'

const Api = {
  TypeList: '/business/type',
  Submit: '/business/submit'
}as const
type Api = typeof Api[keyof typeof Api]

function typeListApi() {
  return get(Api.TypeList)
}

function submitApi(data: any) {
  return post(Api.Submit, data)
}

export {
  typeListApi,
  submitApi
}

