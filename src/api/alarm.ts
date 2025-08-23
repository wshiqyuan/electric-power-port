import { get, post } from '@/utils/http'

const Api = {
  alarmList: '/alarmList',
  assignAlarm: '/assignAlarm'

} as const
type Api = typeof Api[keyof typeof Api]

function getAlarmList() {
  return get(Api.alarmList)
}

function assignAlarm(formData: any) {
  return post(Api.assignAlarm, formData)
}

export { getAlarmList, assignAlarm }