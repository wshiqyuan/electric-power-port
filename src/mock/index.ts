import Mock from 'mockjs'
Mock.setup({
  timeout:"200-600"// 设置延迟时间
})

//管理员权限菜单
const menulist = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/manage",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/member",
      icon: "Magnet"
    },
    {
      name: "招商管理",
      url: "/business",
      icon: "Document"
    },
    {
      name: "系统设置",
      url: "/system",
      icon: "Setting"
    },
  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
]
//运营专员权限菜单
const menulist2 = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/manage",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/member",
      icon: "Magnet"
    },  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
]

// 登录接口
Mock.mock("https://www.demo.com/login","post",(options:any) => {
  const{username, password} = JSON.parse(options.body)
  if(username === "admin" && password === "_admin123"){
    return {
      code:200,
      msg:"登录成功",
      data:{
        token:"admintoken123122",
        user:{
          username:'admin',
          roles:["admin"]
        },
        menulist: menulist
      }
    }
  } else if(username === "user" && password === "_user666") {
    return {
      code:200,
      msg:"登录成功",
      data:{
        token:"usertokenqewq312",
        user:{
          username:'user',
          roles:["user"]
        },
        menulist: menulist2
      }
    }
  } else {
    return {
      code:401,
      msg:"登录失败,用户名或密码错误",
      data:null
    }
  }
})

// echart图表接口，折线图
Mock.mock("https://www.demo.com/chartData","get",() => {
  return{ 
    code: 200,
    message:"success",
    data:{
      list:[
        {
          name:'充电量',
          data:[20,50,30,70,60,80,40,60,50,30,30,25]
        },
        {
          name:'充电时长',
          data:[40,60,50,80,70,90,60,70,80,40,60,50]
        },
        {
          name:'充电功率',
          data:[30,40,60,50,70,40,30,40,60,40,50,30]
        }
      ]
    }
  }
})

Mock.mock("https://www.demo.com/chartData2","get",() => {
  return{ 
    code: 200,
    message:"success",
    data:{
      list:[
        { value: 35, name: '充电桩' },
        { value: 30, name: '充电站' },
        { value: 25, name: '充电柜' }
      ]
    }
  }
})

Mock.mock("https://www.demo.com/chartData3","get",() => {
  return{ 
    code: 200,
    message:"success",
    data:{
      list:[ 42, 30, 200, 230, 221, 180 ]
    }
  }
})

//充电站监控接口
let chargingStation = [
  {
    name: "北京西单充电站",
    id: "VXZ10001",
    city: "北京",
    fast: 95,
    slow: 40,
    status: 3,
    now: 10,
    fault: 1,
    person: "张伟",
    tel: 17876554801
  },
  {
    name: "上海陆家嘴充电站",
    id: "VXZ10002",
    city: "上海",
    fast: 90,
    slow: 35,
    status: 2,
    now: 20,
    fault: 2,
    person: "李娜",
    tel: 17876554802
  },
  {
    name: "广州花城广场充电站",
    id: "VXZ10003",
    city: "广州",
    fast: 85,
    slow: 38,
    status: 2,
    now: 5,
    fault: 0,
    person: "王强",
    tel: 17876554803
  },
  {
    name: "深圳大梅沙充电站",
    id: "VXZ10004",
    city: "深圳",
    fast: 80,
    slow: 30,
    status: 3,
    now: 15,
    fault: 1,
    person: "赵敏",
    tel: 17876554804
  },
  {
    name: "成都天府广场充电站",
    id: "VXZ10005",
    city: "成都",
    fast: 88,
    slow: 37,
    status: 5,
    now: 12,
    fault: 2,
    person: "李晓华",
    tel: 17876554805
  },
  {
    name: "西安钟楼充电站",
    id: "VXZ10006",
    city: "西安",
    fast: 82,
    slow: 33,
    status: 4,
    now: 8,
    fault: 0,
    person: "刘伟",
    tel: 17876554806
  },
  {
    name: "杭州西湖充电站",
    id: "VXZ10007",
    city: "杭州",
    fast: 75,
    slow: 29,
    status: 3,
    now: 18,
    fault: 3,
    person: "陈芳",
    tel: 17876554807
  },
  {
    name: "南京夫子庙充电站",
    id: "VXZ10008",
    city: "南京",
    fast: 89,
    slow: 40,
    status: 2,
    now: 22,
    fault: 1,
    person: "黄伟",
    tel: 17876554808
  },
  {
    name: "天津意大利风情区充电站",
    id: "VXZ10009",
    city: "天津",
    fast: 87,
    slow: 36,
    status: 2,
    now: 6,
    fault: 0,
    person: "吴敏",
    tel: 17876554809
  },
  {
    name: "青岛栈桥充电站",
    id: "VXZ10010",
    city: "青岛",
    fast: 91,
    slow: 32,
    status: 3,
    now: 25,
    fault: 1,
    person: "杨杰",
    tel: 17876554810
  },
  {
    name: "武汉黄鹤楼充电站",
    id: "VXZ10011",
    city: "武汉",
    fast: 74,
    slow: 28,
    status: 2,
    now: 11,
    fault: 2,
    person: "周丽",
    tel: 17876554811
  },
  {
    name: "福州三坊七巷充电站",
    id: "VXZ10012",
    city: "福州",
    fast: 76,
    slow: 31,
    status: 4,
    now: 19,
    fault: 1,
    person: "林涛",
    tel: 17876554812
  },
  {
    name: "合肥包公园充电站",
    id: "VXZ10013",
    city: "合肥",
    fast: 70,
    slow: 30,
    status: 2,
    now: 3,
    fault: 0,
    person: "高峰",
    tel: 17876554813
  },
  {
    name: "重庆解放碑充电站",
    id: "VXZ10014",
    city: "重庆",
    fast: 83,
    slow: 34,
    status: 2,
    now: 14,
    fault: 2,
    person: "邓超",
    tel: 17876554814
  },
  {
    name: "桂林漓江充电站",
    id: "VXZ10015",
    city: "桂林",
    fast: 77,
    slow: 29,
    status: 2,
    now: 9,
    fault: 1,
    person: "李曼",
    tel: 17876554815
  },
  {
    name: "苏州园区充电站",
    id: "VXZ10016",
    city: "苏州",
    fast: 80,
    slow: 35,
    status: 2,
    now: 7,
    fault: 0,
    person: "王琦",
    tel: 17876554816
  },
  {
    name: "昆明滇池充电站",
    id: "VXZ10017",
    city: "昆明",
    fast: 79,
    slow: 33,
    status: 3,
    now: 21,
    fault: 1,
    person: "陈超",
    tel: 17876554817
  },
  {
    name: "南宁青秀山充电站",
    id: "VXZ10018",
    city: "南宁",
    fast: 81,
    slow: 36,
    status: 2,
    now: 13,
    fault: 0,
    person: "蔡徐坤",
    tel: 17876554818
  },
  {
    name: "长沙橘子洲头充电站",
    id: "VXZ10019",
    city: "长沙",
    fast: 78,
    slow: 34,
    status: 2,
    now: 4,
    fault: 0,
    person: "李安",
    tel: 17876554819
  },
  {
    name: "哈尔滨中央大街充电站",
    id: "VXZ10020",
    city: "哈尔滨",
    fast: 75,
    slow: 32,
    status: 2,
    now: 23,
    fault: 1,
    person: "林雨",
    tel: 17876554820
  },
  {
    name: "石家庄正定古城充电站",
    id: "VXZ10021",
    city: "石家庄",
    fast: 72,
    slow: 31,
    status: 4,
    now: 16,
    fault: 2,
    person: "郑明",
    tel: 17876554821
  },
  {
    name: "兰州黄河桥充电站",
    id: "VXZ10022",
    city: "兰州",
    fast: 88,
    slow: 38,
    status: 5,
    now: 5,
    fault: 0,
    person: "李伟",
    tel: 17876554822
  },
  {
    name: "济南大明湖充电站",
    id: "VXZ10023",
    city: "济南",
    fast: 93,
    slow: 39,
    status: 3,
    now: 17,
    fault: 1,
    person: "刘洋",
    tel: 17876554823
  },
  {
    name: "沈阳故宫充电站",
    id: "VXZ10024",
    city: "沈阳",
    fast: 76,
    slow: 32,
    status: 4,
    now: 19,
    fault: 1,
    person: "张博",
    tel: 17876554824
  },
  {
    name: "福州西湖充电站",
    id: "VXZ10025",
    city: "福州",
    fast: 79,
    slow: 34,
    status: 2,
    now: 6,
    fault: 0,
    person: "周扬",
    tel: 17876554825
  },
  {
    name: "无锡灵山大佛充电站",
    id: "VXZ10026",
    city: "无锡",
    fast: 85,
    slow: 38,
    status: 3,
    now: 12,
    fault: 1,
    person: "江海",
    tel: 17876554826
  },
  {
    name: "郑州二七广场充电站",
    id: "VXZ10027",
    city: "郑州",
    fast: 84,
    slow: 36,
    status: 3,
    now: 20,
    fault: 2,
    person: "胡丽",
    tel: 17876554827
  },
  {
    name: "大连星海广场充电站",
    id: "VXZ10028",
    city: "大连",
    fast: 82,
    slow: 35,
    status: 2,
    now: 7,
    fault: 0,
    person: "李涛",
    tel: 17876554828
  },
  {
    name: "宁波天一广场充电站",
    id: "VXZ10029",
    city: "宁波",
    fast: 90,
    slow: 40,
    status: 4,
    now: 15,
    fault: 1,
    person: "程伟",
    tel: 17876554829
  },
  {
    name: "贵阳甲秀楼充电站",
    id: "VXZ10030",
    city: "贵阳",
    fast: 81,
    slow: 33,
    status: 3,
    now: 14,
    fault: 2,
    person: "马云",
    tel: 17876554830
  },
  {
    name: "珠海长隆海洋王国充电站",
    id: "VXZ10031",
    city: "珠海",
    fast: 78,
    slow: 36,
    status: 2,
    now: 11,
    fault: 3,
    person: "王超",
    tel: 17876554831
  },
  {
    name: "天津滨海新区充电站",
    id: "VXZ10032",
    city: "天津",
    fast: 92,
    slow: 37,
    status: 2,
    now: 8,
    fault: 0,
    person: "黄华",
    tel: 17876554832
  }
]
// 原始的数据备份
const originalChargingStation = JSON.parse(JSON.stringify(chargingStation))
// 定义 获取充电站数据 API 接口
Mock.mock("https://www.demo.com/stationList", 'post', (options: any) => {
  chargingStation = originalChargingStation
  const { id, name, status, page, pageSize } = options.body ? JSON.parse(options.body) : {}
  // 过滤数据
  if (id) {
    chargingStation = chargingStation.filter(item => item.id === id)
  }
  if (name) {
    chargingStation = chargingStation.filter(item => item.name.includes(name))
  }
  if (status != 1) {
    chargingStation = chargingStation.filter(item => item.status === status)
  }
  // 实现分页
  const total = chargingStation.length
  const start = (page - 1) * pageSize
  const paginatedItems = chargingStation.slice(start, start + pageSize)
  return {
    code: 200,
    success: true,
    data: {
      list:paginatedItems,
      total
    },
    
  }
})

// 定义 新增/编辑充电站数据 API 接口
Mock.mock("https://www.demo.com/station/edit", 'post', (options: any) => {
  const res:any = JSON.parse(options.body)
  console.log(res)
  return {
    code: 200,
    success: true,
    data: '操作成功',
  }
})

// 删除接口
Mock.mock("https://www.demo.com/station/delete", 'post', (options: any) => {
  const res:any = JSON.parse(options.body)
  console.log('删除接口收到参数',res)
  return {
    code: 200,
    success: true,
    data: '删除成功',
  }
})


// 营收统计数据接口
let revenueData = [
  {
    dataName: '今日总收入(元)',
    data: 439824,
    percent: -21,
  },
  {
    dataName: '本月总收入(万元)',
    data: 2924,
    percent: 12,
  },
  {
    dataName: '会员卡储值(万元)',
    data: 5234,
    percent: 13,
  },
  {
    dataName: '服务费总金额(元)',
    data: 115424,
    percent: -10,
  },
  {
    dataName: '停车费总金额(元)',
    data: 95424,
    percent: -10,
  },
  {
    dataName: '电费总金额(元)',
    data: 228976,
    percent: 9,
  }
]

let chargingStationFormData = [
  {
    name: "北京西单充电站",
    id: "VXZ10001",
    city: "北京",
    count: 135, // 充电桩总数量
    electricity: 7563, // 电费
    parkingFee: 2356, // 停车费
    serviceFee: 5633, // 服务费
    dailyIncome:  15552,
    monthIncome: 215534, // 月度总收入
    member: 569853, // 会员储值金
    percent: -5.3, // 增长比例
    mpercent: 2.3
  },
  {
    name: "上海陆家嘴充电站",
    id: "VXZ10002",
    city: "上海",
    count: 125, // fast + slow
    electricity: 8132,
    parkingFee: 3432,
    serviceFee: 7312,
    dailyIncome: 18876,
    monthIncome: 342223,
    member: 750043,
    percent: 2.5,
    mpercent: 2.4
  },
  {
    name: "广州花城广场充电站",
    id: "VXZ10003",
    city: "广州",
    count: 123,
    electricity: 7423,
    parkingFee: 3132,
    serviceFee: 7322,
    dailyIncome: 17877,
    monthIncome: 524342,
    member: 432121,
    percent: 3.0,
    mpercent: 3.5
  },
  {
    name: "深圳大梅沙充电站",
    id: "VXZ10004",
    city: "深圳",
    count: 110,
    electricity: 7832,
    parkingFee: 2912,
    serviceFee: 6905,
    dailyIncome: 17649,
    monthIncome: 494326,
    member: 396543,
    percent: -1.8,
    mpercent: -2.6
  },
  {
    name: "成都天府广场充电站",
    id: "VXZ10005",
    city: "成都",
    count: 125,
    electricity: 8300,
    parkingFee: 3200,
    serviceFee: 7200,
    dailyIncome: 18200,
    monthIncome: 530032,
    member: 370340,
    percent: 3.5,
    mpercent: -0.1
  },
  {
    name: "西安钟楼充电站",
    id: "VXZ10006",
    city: "西安",
    count: 115,
    electricity: 7900,
    parkingFee: 2950,
    serviceFee: 7050,
    dailyIncome: 17900,
    monthIncome: 289700,
    member: 345340,
    percent: -2.2,
    mpercent: -0.8
  },
  {
    name: "杭州西湖充电站",
    id: "VXZ10007",
    city: "杭州",
    count: 104,
    electricity: 7600,
    parkingFee: 2800,
    serviceFee: 6800,
    dailyIncome: 17700,
    monthIncome: 481032,
    member: 330340,
    percent: 1.5,
    mpercent: 0.7
  },
  {
    name: "南京夫子庙充电站",
    id: "VXZ10008",
    city: "南京",
    count: 129,
    electricity: 8400,
    parkingFee: 3250,
    serviceFee: 7250,
    dailyIncome: 18400,
    monthIncome: 542332,
    member: 475340,
    percent: 4.0,
    mpercent: 6.2
  },
  {
    name: "天津意大利风情区充电站",
    id: "VXZ10009",
    city: "天津",
    count: 123,
    electricity: 8150,
    parkingFee: 3100,
    serviceFee: 7100,
    dailyIncome: 18150,
    monthIncome: 576997,
    member: 350340,
    percent: -2.8,
    mpercent: -0.4
  },
  {
    name: "青岛栈桥充电站",
    id: "VXZ10010",
    city: "青岛",
    count: 123,
    electricity: 8100,
    parkingFee: 3050,
    serviceFee: 7050,
    dailyIncome: 18100,
    monthIncome: 187977,
    member: 345240,
    percent: 2.7,
    mpercent: 3.4
  },
  {
    name: "武汉黄鹤楼充电站",
    id: "VXZ10011",
    city: "武汉",
    count: 102,
    electricity: 7400,
    parkingFee: 2700,
    serviceFee: 6700,
    dailyIncome: 17400,
    monthIncome: 472332,
    member: 225367,
    percent: 1.2,
    mpercent: 0.6
  },
  {
    name: "福州三坊七巷充电站",
    id: "VXZ10012",
    city: "福州",
    count: 107,
    electricity: 7650,
    parkingFee: 2850,
    serviceFee: 6850,
    dailyIncome: 17650,
    monthIncome: 482332,
    member: 435340,
    percent: 1.7,
    mpercent: 1.3
  },
  {
    name: "合肥包公园充电站",
    id: "VXZ10013",
    city: "合肥",
    count: 100,
    electricity: 7200,
    parkingFee: 2600,
    serviceFee: 6600,
    dailyIncome: 17200,
    monthIncome: 462332,
    member: 334330,
    percent: -0.9,
    mpercent: 0.5
  },
  {
    name: "重庆解放碑充电站",
    id: "VXZ10014",
    city: "重庆",
    count: 117,
    electricity: 7950,
    parkingFee: 3000,
    serviceFee: 7100,
    dailyIncome: 17950,
    monthIncome: 297896,
    member: 389732,
    percent: 2.6,
    mpercent: 3.1
  },
  {
    name: "桂林漓江充电站",
    id: "VXZ10015",
    city: "桂林",
    count: 106,
    electricity: 7700,
    parkingFee: 2800,
    serviceFee: 6900,
    dailyIncome: 17700,
    monthIncome: 492332,
    member: 289760,
    percent: 2.0,
    mpercent: -1.5
  },
  {
    name: "苏州园区充电站",
    id: "VXZ10016",
    city: "苏州",
    count: 115,
    electricity: 7900,
    parkingFee: 2950,
    serviceFee: 7050,
    dailyIncome: 17900,
    monthIncome: 276868,
    member: 245340,
    percent: 2.3,
    mpercent: 0.9
  },
  {
    name: "昆明滇池充电站",
    id: "VXZ10017",
    city: "昆明",
    count: 112,
    electricity: 7800,
    parkingFee: 2900,
    serviceFee: 7000,
    dailyIncome: 17800,
    monthIncome: 502332,
    member: 131550,
    percent: -2.1,
    mpercent: 0.8
  },
  {
    name: "南宁青秀山充电站",
    id: "VXZ10018",
    city: "南宁",
    count: 117,
    electricity: 7900,
    parkingFee: 2950,
    serviceFee: 7050,
    dailyIncome: 17900,
    monthIncome: 465756,
    member: 245340,
    percent: -2.4,
    mpercent: -2.7
  },
  {
    name: "长沙橘子洲头充电站",
    id: "VXZ10019",
    city: "长沙",
    count: 112,
    electricity: 7750,
    parkingFee: 2850,
    serviceFee: 6950,
    dailyIncome: 17750,
    monthIncome: 492332,
    member: 235344,
    percent: -1.9,
    mpercent: -1.1
  },
  {
    name: "哈尔滨中央大街充电站",
    id: "VXZ10020",
    city: "哈尔滨",
    count: 107,
    electricity: 7650,
    parkingFee: 2800,
    serviceFee: 6800,
    dailyIncome: 17650,
    monthIncome: 482332,
    member: 430234,
    percent: 1.6,
    mpercent: -0.9
  },
  {
    name: "石家庄正定古城充电站",
    id: "VXZ10021",
    city: "石家庄",
    count: 103,
    electricity: 7500,
    parkingFee: 2750,
    serviceFee: 6750,
    dailyIncome: 17500,
    monthIncome: 472332,
    member: 125340,
    percent: 1.3,
    mpercent: 2.8
  },
  {
    name: "兰州黄河桥充电站",
    id: "VXZ10022",
    city: "兰州",
    count: 126,
    electricity: 8200,
    parkingFee: 3150,
    serviceFee: 7150,
    dailyIncome: 18200,
    monthIncome: 245678,
    member: 123550,
    percent: 3.1,
    mpercent: 4.4
  },
  {
    name: "济南大明湖充电站",
    id: "VXZ10023",
    city: "济南",
    count: 132,
    electricity: 8400,
    parkingFee: 3250,
    serviceFee: 7250,
    dailyIncome: 18400,
    monthIncome: 365787,
    member: 126550,
    percent: -3.7,
    mpercent: -5.5
  },
  {
    name: "沈阳故宫充电站",
    id: "VXZ10024",
    city: "沈阳",
    count: 108,
    electricity: 7700,
    parkingFee: 2850,
    serviceFee: 6850,
    dailyIncome: 17700,
    monthIncome: 492332,
    member: 133550,
    percent: 1.8,
    mpercent: -2.3
  },
  {
    name: "福州西湖充电站",
    id: "VXZ10025",
    city: "福州",
    count: 113,
    electricity: 7850,
    parkingFee: 2950,
    serviceFee: 6950,
    dailyIncome: 17850,
    monthIncome: 344534,
    member: 174453,
    percent: 2.0,
    mpercent: 2.2
  },
  {
    name: "无锡灵山大佛充电站",
    id: "VXZ10026",
    city: "无锡",
    count: 123,
    electricity: 8100,
    parkingFee: 3050,
    serviceFee: 7050,
    dailyIncome: 18100,
    monthIncome: 268678,
    member: 19500,
    percent: -2.8,
    mpercent: -3.2
  },
  {
    name: "郑州二七广场充电站",
    id: "VXZ10027",
    city: "郑州",
    count: 120,
    electricity: 8000,
    parkingFee: 3000,
    serviceFee: 7000,
    dailyIncome: 18000,
    monthIncome: 324231,
    member: 19500,
    percent: 2.4,
    mpercent: 0.8
  },
  {
    name: "大连星海广场充电站",
    id: "VXZ10028",
    city: "大连",
    count: 117,
    electricity: 7950,
    parkingFee: 3000,
    serviceFee: 7100,
    dailyIncome: 17950,
    monthIncome: 343233,
    member: 169900,
    percent: 2.6,
    mpercent: 3.9
  },
  {
    name: "宁波天一广场充电站",
    id: "VXZ10029",
    city: "宁波",
    count: 130,
    electricity: 8250,
    parkingFee: 3150,
    serviceFee: 7150,
    dailyIncome: 18250,
    monthIncome: 312332,
    member: 469900,
    percent: -3.4,
    mpercent: -2.3
  },
  {
    name: "贵阳甲秀楼充电站",
    id: "VXZ10030",
    city: "贵阳",
    count: 114,
    electricity: 7850,
    parkingFee: 2950,
    serviceFee: 6950,
    dailyIncome: 17850,
    monthIncome: 302332,
    member: 169900,
    percent: 2.2,
    mpercent: -1.4
  },
  {
    name: "珠海长隆海洋王国充电站",
    id: "VXZ10031",
    city: "珠海",
    count: 114,
    electricity: 7850,
    parkingFee: 2950,
    serviceFee: 6950,
    dailyIncome: 17850,
    monthIncome: 402332,
    member: 269900,
    percent: 2.2,
    mpercent: 1.8
  },
  {
    name: "天津滨海新区充电站",
    id: "VXZ10032",
    city: "天津",
    count: 129,
    electricity: 8350,
    parkingFee: 3200,
    serviceFee: 7200,
    dailyIncome: 18350,
    monthIncome: 232332,
    member: 360331,
    percent: -3.6,
    mpercent: -2.6
  }
]

const originalStationFormData = chargingStationFormData


// 定义 营收统计数据 API 接口
Mock.mock("https://www.demo.com/revenue/list", 'get', () => {
  return {
    code: 200,
    success: true,
    data: revenueData,
  }
})

// 定义 营收统计图表数据 API 接口
Mock.mock("https://www.demo.com/revenue/chart", 'get', () => {
  return {
    code: 200,
    success: true,
    data: {
      list:[
        {
          name: '销售',
          data: [120, 200, 150, 80, 70, 110, 130, 100, 210, 150, 90, 134]
        },
        {
          name: '访问量',
          data: [636, 379, 483, 421, 582, 459, 790, 810, 682, 538, 329, 411]
        }
      ]
    }
  }
})

// 定义 营收统计表格接口
Mock.mock("https://www.demo.com/revenue/form", 'post', (option: any) => {
  chargingStationFormData = originalStationFormData
  const { name = "", page = 1, pageSize = 10 } = option.body ? JSON.parse(option.body) : {}
  // 根据条件过滤数据
  if (name) {
    chargingStationFormData = chargingStationFormData.filter(item => item.name.includes(name))
  }
  // 实现分页
  const total = chargingStationFormData.length
  const start = (page - 1) * pageSize
  const paginatedItems = chargingStationFormData.slice(start, start + pageSize)
  return {
    code: 200,
    success: true,
    data: {
      list: paginatedItems,
      total
    }
  }
})
