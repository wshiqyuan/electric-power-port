interface RevenueList {
  dataName: string
  data: number
  percent: number
}

interface RevenueForm {
  name: string,
  id: string,
  city: string,
  count: number,
  electricity: number,
  parkingFee: number,
  serviceFee: number,
  dailyIcome: number,
  monthIncome: number,
  member: number,
  percent: number,
  mpercent: number
}

export type{ RevenueList, RevenueForm }

