import { post } from '@/utils/http'

const Api = {
  BatchDelete: '/orderDelete'
}as const
type Api = typeof Api[keyof typeof Api]

function orderDeleteApi(order: string[]){
  return post(Api.BatchDelete, { order })
}

export { orderDeleteApi }