import { post } from '@/utils/http'

const Api = {
  CurrentList:'/manage/chargingStation',
} as const
type Api = typeof Api[keyof typeof Api]

function currentListApi() {
  return post(Api.CurrentList)
}

export { currentListApi }
