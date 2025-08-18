import { post } from "@/utils/http"

const Api = {
  getMapList: '/mapList',
  postStation: '/mapform'
}as const
type Api = typeof Api[keyof typeof Api]

function getMapListApi() {
  return post(Api.getMapList)
}

function postStationApi(data: any) {
  return post(Api.postStation, data)
}

export { postStationApi, getMapListApi }
