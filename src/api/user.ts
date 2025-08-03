import { post } from '@/utils/http'

// 使用类型字面量 + as const 来定义常量替代enum类型
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