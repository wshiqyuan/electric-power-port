import { post } from '@/utils/http'

const Api = {
  Auth: '/userAuth',
  SetAuth: '/setAuth',
  DeleteAuth: '/deleteAuth',
  DisableAuth: '/disableAuth'
}as const
type Api = typeof Api[keyof typeof Api]

function getAuthApi(pageAuthority: string) {
  return post(Api.Auth, {pageAuthority})
}

function setAuthApi( account: string, btnList: string[], pageList: string[] ) {
  return post(Api.SetAuth, { account, btnList, pageList })
}

function deleteAuthApi( account: string ) {
  return post(Api.DeleteAuth, { account })
}

function disableAuthApi( account: string ) {
  return post(Api.DisableAuth, { account })
}

export {
  getAuthApi,
  setAuthApi,
  deleteAuthApi,
  disableAuthApi
}