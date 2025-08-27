import { post } from '@/utils/http'

const Api = {
  getInfo: "/personalInfo",
  changeInfo: "/personalInfo/change",
  getNotice: "/personalInfo/notice",
}as const
type Api = (typeof Api)[keyof typeof Api]

function getInfo () {
  return post(Api.getInfo, {token: sessionStorage.getItem("token") || ""})
}

function submitChangeInfo (formData:any) {
  return post(Api.changeInfo, formData)
}

function getNotice () {
  return post(Api.getNotice, {token: sessionStorage.getItem("token") || ""})
}

export {
  getInfo,
  submitChangeInfo,
  getNotice
}
