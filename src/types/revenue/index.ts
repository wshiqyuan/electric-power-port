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
  month:number,
  member: number,
  percent: number,
  monthPercent: number
}

export type{ RevenueList, RevenueForm }

