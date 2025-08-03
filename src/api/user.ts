import { post } from '@/utils/http'

const Api = {
  Login: '/login'
}as const
type  Api = typeof Api[keyof typeof Api]

interface LoginParams {
  username:string,
  password:string
}

function loginApi(data:LoginParams):Promise<any> {
  return post(Api.Login, data)
}

export { loginApi }