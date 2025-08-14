import { post } from '@/utils/http'
import type { RowType } from '@/types/station'

interface ListType {
  page: number,
  pageSize: number,
  id?: number,
  name?: string,
  status: number,
}

const Api = {
  List: '/stationList',
  Edit: '/station/edit',
  Delete: '/station/delete',
} as const
type Api = typeof Api[keyof typeof Api]

function listApi(data: ListType) {
  return post(Api.List, data)
}

function editApi(data: RowType) {
  return post(Api.Edit, data)
}

function deleteApi(id: string) {
  return post(Api.Delete, { id } )
}

export { listApi, editApi, deleteApi }
