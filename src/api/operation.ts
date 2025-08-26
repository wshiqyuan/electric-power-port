import { get, post } from '@/utils/http'

const Api = {
  BatchDelete: '/orderDelete',
  GetTree: '/cityList',
  TotalForm: '/totalForm',
  OrderDetail: '/orderDetail',

}as const
type Api = typeof Api[keyof typeof Api]

function orderDeleteApi(order: string[]){
  return post(Api.BatchDelete, { order })
}

function getTreeApi(){
  return get(Api.GetTree)
}

function totalFormApi(formData: any){
  return post(Api.TotalForm, formData )
}

function orderDetailApi(order: string){
  return post(Api.OrderDetail, { order })
}

export { orderDeleteApi, getTreeApi, totalFormApi, orderDetailApi }


