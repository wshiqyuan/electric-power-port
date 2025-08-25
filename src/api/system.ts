import { post } from '@/utils/http'

const Api = {
  Auth: '/userAuth'
}as const
type Api = typeof Api[keyof typeof Api]

function getAuthApi(pageAuthority: string) {
  return post(Api.Auth, {pageAuthority})
}

export {
  getAuthApi
}