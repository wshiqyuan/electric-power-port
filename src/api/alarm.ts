import { get } from '@/utils/http'

const Api = {
  alarmList: '/alarmList'
} as const
type Api = typeof Api[keyof typeof Api]

function getAlarmList() {
  return get(Api.alarmList)
}

export { getAlarmList }