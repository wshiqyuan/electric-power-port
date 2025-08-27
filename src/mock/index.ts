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

// 定义 充电桩管理页面充电桩数据 API 接口
let chargingPile = [
  {
    id: "VXZ10001",
    name: "北京西单充电站",
    list: [
      { id: "CD1001", voltage: "380v", current: "32.5A", power: "12.4KW", tem: "28°c", status: 1,
        record:[
          {time:"12:08:17",msg:"充电80度，消费80元"},
          {time:"13:12:09",msg:"充电50度，消费50元"},
          {time:"13:15:22",msg:"充电60度，消费60元"},
          {time:"16:22:33",msg:"充电70度，消费70元"},
          {time:"17:27:17",msg:"充电90度，消费90元"},
          {time:"18:08:33",msg:"充电100度，消费100元"},
        ]
    },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "220v", current: "16A", power: "3.5KW", tem: "31°c", status: 2, percent: "70%" },// 家用慢充
      { id: "CD1003", voltage: "480v", current: "125A", power: "60KW", tem: "35°c", status: 1 },// 直流快充桩待机
      { id: "CD1004", voltage: "375v", current: "58A", power: "21.75KW", tem: "36°c", status: 2, percent: "70%" },// 充电中(375×58=21750W)
      { id: "CD1005", voltage: "368v", current: "45A", power: "16.56KW", tem: "34°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "380v", current: "63A", power: "24KW", tem: "38°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "0v", current: "0A", power: "0KW", tem: "45°c", status: 6 },// 故障状态
      { id: "CD1008", voltage: "370v", current: "52A", power: "19.24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "230v", current: "0.3A", power: "0.069KW", tem: "25°c", status: 1 },// 空闲状态
      { id: "CD1010", voltage: "360v", current: "15A", power: "5.4KW", tem: "30°c", status: 4 },// 排队中
      { id: "CD1011", voltage: "220v", current: "0.5A", power: "0.11KW", tem: "26°c", status: 1 },
      { id: "CD1012", voltage: "365v", current: "12A", power: "4.38KW", tem: "29°c", status: 4 },
      { id: "CD1013", voltage: "230v", current: "0.4A", power: "0.092KW", tem: "25°c", status: 1 },
      { id: "CD1014", voltage: "360v", current: "10A", power: "3.6KW", tem: "28°c", status: 5 },// 被预约
      { id: "CD1015", voltage: "225v", current: "0.35A", power: "0.079KW", tem: "26°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "55A", power: "20.9KW", tem: "37°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "52°c", status: 6 },// 故障高温
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "48°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "46°c", status: 6 },
    ]
  },
  {
    id: "VXZ10002",
    name: "上海陆家嘴充电站",
    list: [
      { id: "CD1001", voltage: "375v", current: "58A", power: "21.75KW", tem: "36°c", status: 2 },// 充电中(375×58=21750W)
      { id: "CD1002", voltage: "0v", current: "0A", power: "0KW", tem: "48°c", status: 6, percent: "70%" },// 故障状态
      { id: "CD1003", voltage: "0v", current: "0A", power: "0KW", tem: "52°c", status: 6 },// 故障高温
      { id: "CD1004", voltage: "360v", current: "10A", power: "3.6KW", tem: "28°c", status: 5, percent: "70%" },// 被预约
      { id: "CD1005", voltage: "365v", current: "12A", power: "4.38KW", tem: "29°c", status: 4, percent: "70%" },// 排队中
      { id: "CD1006", voltage: "380v", current: "63A", power: "24KW", tem: "38°c", status: 2, percent: "70%" },// 充电中(380×63=24000W)
      { id: "CD1007", voltage: "360v", current: "15A", power: "5.4KW", tem: "30°c", status: 3 },// 连接中
      { id: "CD1008", voltage: "370v", current: "52A", power: "19.24KW", tem: "35°c", status: 2, percent: "70%" },// 充电中
      { id: "CD1009", voltage: "362v", current: "14A", power: "5.07KW", tem: "29°c", status: 3 },// 连接中
      { id: "CD1010", voltage: "363v", current: "13A", power: "4.72KW", tem: "29°c", status: 4 },// 排队中
      { id: "CD1011", voltage: "220v", current: "0.5A", power: "0.11KW", tem: "26°c", status: 1 },// 空闲状态
      { id: "CD1012", voltage: "364v", current: "11A", power: "4.0KW", tem: "28°c", status: 4 },// 排队中
      { id: "CD1013", voltage: "230v", current: "0.3A", power: "0.069KW", tem: "25°c", status: 1 },// 空闲状态
      { id: "CD1014", voltage: "361v", current: "9.5A", power: "3.43KW", tem: "27°c", status: 5 },// 被预约
    ],
  },
  {
    id: "VXZ10003",
    name: "广州花城广场充电站",
    list: [
      { id: "CD1001", voltage: "380v", current: "1.2A", power: "0.46kW", tem: "32°c", status: 3 },// 连接中：高电压低电流
      { id: "CD1002", voltage: "240v", current: "45.8A", power: "11kW", tem: "42°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1003", voltage: "380v", current: "0.8A", power: "0.3kW", tem: "31°c", status: 3 },// 连接中：高电压低电流
      { id: "CD1004", voltage: "235v", current: "46.8A", power: "11kW", tem: "40°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1005", voltage: "0v", current: "0A", power: "0kW", tem: "28°c", status: 1, percent: "70%" },// 空闲：无电压电流
      { id: "CD1006", voltage: "230v", current: "47.8A", power: "11kW", tem: "43°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1007", voltage: "0v", current: "0A", power: "0kW", tem: "65°c", status: 6 },// 故障：无电压高温度
      { id: "CD1008", voltage: "380v", current: "1.0A", power: "0.38kW", tem: "33°c", status: 3, percent: "70%" },// 连接中：高电压低电流
      { id: "CD1009", voltage: "0v", current: "0A", power: "0kW", tem: "27°c", status: 1 },// 空闲：无电压电流
      { id: "CD1014", voltage: "0v", current: "0A", power: "0kW", tem: "29°c", status: 5 },// 被预约：无电压电流
      { id: "CD1015", voltage: "245v", current: "44.9A", power: "11kW", tem: "41°c", status: 2 },// 充电中：正常电压电流
      { id: "CD1016", voltage: "380v", current: "1.1A", power: "0.42kW", tem: "34°c", status: 3, percent: "70%" },// 连接中：高电压低电流
      { id: "CD1017", voltage: "0v", current: "0A", power: "0kW", tem: "68°c", status: 6 },// 故障：无电压高温度
      { id: "CD1018", voltage: "0v", current: "0A", power: "0kW", tem: "72°c", status: 6 },// 故障：无电压高温度
      { id: "CD1019", voltage: "0v", current: "0A", power: "0kW", tem: "63°c", status: 6 },// 故障：无电压高温度
    ],
  },
  {
    id: "VXZ10004",
    name: "深圳大梅沙充电站",
    list: [
      { id: "CD1001", voltage: "0v", current: "0A", power: "0kW", tem: "28°c", status: 1 },// 空闲：无电压电流
      { id: "CD1002", voltage: "235v", current: "46.8A", power: "11kW", tem: "40°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1003", voltage: "0v", current: "0A", power: "0kW", tem: "27°c", status: 1 },// 空闲：无电压电流
      { id: "CD1004", voltage: "240v", current: "45.8A", power: "11kW", tem: "42°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1005", voltage: "230v", current: "47.8A", power: "11kW", tem: "43°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1006", voltage: "245v", current: "44.9A", power: "11kW", tem: "41°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1007", voltage: "380v", current: "1.0A", power: "0.38kW", tem: "33°c", status: 3 },// 连接中：高电压低电流
      { id: "CD1008", voltage: "238v", current: "46.2A", power: "11kW", tem: "39°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1009", voltage: "0v", current: "0A", power: "0kW", tem: "26°c", status: 1 },// 空闲：无电压电流
      { id: "CD1010", voltage: "0v", current: "0A", power: "0kW", tem: "29°c", status: 4 },// 排队中：无电压电流
      { id: "CD1011", voltage: "0v", current: "0A", power: "0kW", tem: "25°c", status: 1 },// 空闲：无电压电流
      { id: "CD1012", voltage: "0v", current: "0A", power: "0kW", tem: "30°c", status: 4 },// 排队中：无电压电流
      { id: "CD1013", voltage: "0v", current: "0A", power: "0kW", tem: "27°c", status: 1 },// 空闲：无电压电流
      { id: "CD1014", voltage: "0v", current: "0A", power: "0kW", tem: "28°c", status: 5 },// 被预约：无电压电流
      { id: "CD1015", voltage: "0v", current: "0A", power: "0kW", tem: "26°c", status: 1 },// 空闲：无电压电流
      { id: "CD1016", voltage: "232v", current: "47.4A", power: "11kW", tem: "44°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1017", voltage: "0v", current: "0A", power: "0kW", tem: "65°c", status: 6 },// 故障：无电压高温度
      { id: "CD1018", voltage: "0v", current: "0A", power: "0kW", tem: "72°c", status: 6 },// 故障：无电压高温度
      { id: "CD1019", voltage: "0v", current: "0A", power: "0kW", tem: "68°c", status: 6 },// 故障：无电压高温度
    ],
  },
  {
    id: "VXZ10005",
    name: "成都天府广场充电站",
    list: [
      { id: "CD1001", voltage: "0v", current: "0A", power: "0kW", tem: "28°c", status: 1 },// 空闲：无电压电流
      { id: "CD1002", voltage: "235v", current: "46.8A", power: "11kW", tem: "40°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1003", voltage: "0v", current: "0A", power: "0kW", tem: "27°c", status: 1 },// 空闲：无电压电流
      { id: "CD1004", voltage: "240v", current: "45.8A", power: "11kW", tem: "42°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1005", voltage: "230v", current: "47.8A", power: "11kW", tem: "43°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1006", voltage: "245v", current: "44.9A", power: "11kW", tem: "41°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1007", voltage: "380v", current: "1.0A", power: "0.38kW", tem: "33°c", status: 3 },// 连接中：高电压低电流
      { id: "CD1008", voltage: "238v", current: "46.2A", power: "11kW", tem: "39°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1009", voltage: "0v", current: "0A", power: "0kW", tem: "26°c", status: 1 },// 空闲：无电压电流
      { id: "CD1010", voltage: "0v", current: "0A", power: "0kW", tem: "29°c", status: 4 },// 排队中：无电压电流
      { id: "CD1011", voltage: "0v", current: "0A", power: "0kW", tem: "25°c", status: 1 },// 空闲：无电压电流
      { id: "CD1012", voltage: "0v", current: "0A", power: "0kW", tem: "30°c", status: 4 },// 排队中：无电压电流
      { id: "CD1013", voltage: "0v", current: "0A", power: "0kW", tem: "27°c", status: 1 },// 空闲：无电压电流
      { id: "CD1014", voltage: "0v", current: "0A", power: "0kW", tem: "28°c", status: 5 },// 被预约：无电压电流
      { id: "CD1015", voltage: "0v", current: "0A", power: "0kW", tem: "26°c", status: 1 },// 空闲：无电压电流
      { id: "CD1016", voltage: "232v", current: "47.4A", power: "11kW", tem: "44°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1017", voltage: "0v", current: "0A", power: "0kW", tem: "65°c", status: 6 },// 故障：无电压高温度
      { id: "CD1018", voltage: "0v", current: "0A", power: "0kW", tem: "72°c", status: 6 },// 故障：无电压高温度
      { id: "CD1019", voltage: "0v", current: "0A", power: "0kW", tem: "68°c", status: 6 },// 故障：无电压高温度
    ],
  },
  {
    id: "VXZ10006",
    name: "西安钟楼充电站",
    list: [
      { id: "CD1001", voltage: "0v", current: "0A", power: "0kW", tem: "28°c", status: 1 },// 空闲：无电压电流
      { id: "CD1002", voltage: "235v", current: "46.8A", power: "11kW", tem: "40°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1003", voltage: "0v", current: "0A", power: "0kW", tem: "27°c", status: 1 },// 空闲：无电压电流
      { id: "CD1004", voltage: "240v", current: "45.8A", power: "11kW", tem: "42°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1005", voltage: "230v", current: "47.8A", power: "11kW", tem: "43°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1006", voltage: "245v", current: "44.9A", power: "11kW", tem: "41°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1007", voltage: "380v", current: "1.0A", power: "0.38kW", tem: "33°c", status: 3 },// 连接中：高电压低电流
      { id: "CD1008", voltage: "238v", current: "46.2A", power: "11kW", tem: "39°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1009", voltage: "0v", current: "0A", power: "0kW", tem: "26°c", status: 1 },// 空闲：无电压电流
      { id: "CD1010", voltage: "0v", current: "0A", power: "0kW", tem: "29°c", status: 4 },// 排队中：无电压电流
      { id: "CD1011", voltage: "0v", current: "0A", power: "0kW", tem: "25°c", status: 1 },// 空闲：无电压电流
      { id: "CD1012", voltage: "0v", current: "0A", power: "0kW", tem: "30°c", status: 4 },// 排队中：无电压电流
      { id: "CD1013", voltage: "0v", current: "0A", power: "0kW", tem: "27°c", status: 1 },// 空闲：无电压电流
      { id: "CD1014", voltage: "0v", current: "0A", power: "0kW", tem: "28°c", status: 5 },// 被预约：无电压电流
      { id: "CD1015", voltage: "0v", current: "0A", power: "0kW", tem: "26°c", status: 1 },// 空闲：无电压电流
      { id: "CD1016", voltage: "232v", current: "47.4A", power: "11kW", tem: "44°c", status: 2, percent: "70%" },// 充电中：正常电压电流
      { id: "CD1017", voltage: "0v", current: "0A", power: "0kW", tem: "65°c", status: 6 },// 故障：无电压高温度
      { id: "CD1018", voltage: "0v", current: "0A", power: "0kW", tem: "72°c", status: 6 },// 故障：无电压高温度
      { id: "CD1019", voltage: "0v", current: "0A", power: "0kW", tem: "68°c", status: 6 },// 故障：无电压高温度
    ],
  },
  {
    id: "VXZ10007",
    name: "杭州西湖充电站",
    list: [
      { id: "CD1001", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380V", current: "50A", power: "19kW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1004", voltage: "380V", current: "45A", power: "17.1kW", tem: "34°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "380V", current: "60A", power: "$22.8kW", tem: "36°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "220V", current: "32A", power: "7.04kW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "$380V", current: "$10A", power: "3.8kW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380V", current: "55A", power: "20.9kW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1010", voltage: "0V", current: "0A", power: "0kW", tem: "28°c", status: 4 },
      { id: "CD1011", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },
      { id: "CD1012", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1014", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 5 },
      { id: "CD1015", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1016", voltage: "380V", current: "40A", power: "15.2kW", tem: "33°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "0V", current: "0A", power: "0kW", tem: "45°c", status: 6 },
      { id: "CD1018", voltage: "0V", current: "0A", power: "0kW", tem: "43°c", status: 6 },
      { id: "CD1019", voltage: "0V", current: "0A", power: "0kW", tem: "44°c", status: 6 },

    ],
  },
  {
    id: "VXZ10008",
    name: "南京夫子庙充电站",
    list: [
      { id: "CD1001", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380V", current: "52A", power: "19.76kW", tem: "36°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1004", voltage: "380V", current: "48A", power: "18.24kW", tem: "34°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "220V", current: "30A", power: "6.6kW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "380V", current: "55A", power: "20.9kW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "380V", current: "10A", power: "3.8kW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380V", current: "45A", power: "17.1kW", tem: "33°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1010", voltage: "0V", current: "0A", power: "0kW", tem: "28°c", status: 4 },
      { id: "CD1011", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },
      { id: "CD1012", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1014", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 5 },
      { id: "CD1015", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1016", voltage: "380V", current: "58A", power: "22.04kW", tem: "37°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "0V", current: "0A", power: "0kW", tem: "45°c", status: 6 },
      { id: "CD1018", voltage: "0V", current: "0A", power: "0kW", tem: "43°c", status: 6 },
      { id: "CD1019", voltage: "0V", current: "0A", power: "0kW", tem: "44°c", status: 6 },
    ],
  },
  {
    id: "VXZ10009",
    name: "天津意大利风情区充电站",
    list: [
      { id: "CD1001", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380V", current: "52A", power: "19.76kW", tem: "36°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1004", voltage: "380V", current: "48A", power: "18.24kW", tem: "34°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "220V", current: "30A", power: "6.6kW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "380V", current: "55A", power: "20.9kW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "380V", current: "10A", power: "3.8kW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380V", current: "45A", power: "17.1kW", tem: "33°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1010", voltage: "0V", current: "0A", power: "0kW", tem: "28°c", status: 4 },
      { id: "CD1011", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },
      { id: "CD1012", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1014", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 5 },
      { id: "CD1015", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1016", voltage: "380V", current: "58A", power: "22.04kW", tem: "37°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "0V", current: "0A", power: "0kW", tem: "45°c", status: 6 },
      { id: "CD1018", voltage: "0V", current: "0A", power: "0kW", tem: "43°c", status: 6 },
      { id: "CD1019", voltage: "0V", current: "0A", power: "0kW", tem: "44°c", status: 6 },
    ],
  },
  {
    id: "VXZ10010",
    name: "青岛栈桥充电站",
    list: [
      { id: "CD1001", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380V", current: "42A", power: "15.96kW", tem: "33°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1004", voltage: "220V", current: "32A", power: "7.04kW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "380V", current: "55A", power: "20.9kW", tem: "36°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "380V", current: "50A", power: "19kW", tem: "34°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "380V", current: "10A", power: "3.8kW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380V", current: "48A", power: "18.24kW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1010", voltage: "0V", current: "0A", power: "0kW", tem: "28°c", status: 4 },
      { id: "CD1011", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 1 },
      { id: "CD1012", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "0V", current: "0A", power: "0kW", tem: "25°c", status: 1 },
      { id: "CD1014", voltage: "0V", current: "0A", power: "0kW", tem: "27°c", status: 5 },
      { id: "CD1015", voltage: "0V", current: "0A", power: "0kW", tem: "26°c", status: 1 },
      { id: "CD1016", voltage: "380V", current: "53A", power: "20.14kW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "0V", current: "0A", power: "0kW", tem: "45°c", status: 6 },
      { id: "CD1018", voltage: "0V", current: "0A", power: "0kW", tem: "43°c", status: 6 },
      { id: "CD1019", voltage: "0V", current: "0A", power: "0kW", tem: "44°c", status: 6 },
    ],
  },
  {
    id: "VXZ10011",
    name: "武汉黄鹤楼充电站",
    list: [
      { id: "CD1001", voltage: "318v", current: "0.1A", power: "0.03KW", tem: "30°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "315v", current: "105.2A", power: "33.1KW", tem: "42°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "317v", current: "0.2A", power: "0.06KW", tem: "28°c", status: 1 },
      { id: "CD1004", voltage: "316v", current: "98.5A", power: "31.1KW", tem: "39°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "112.3A", power: "35.3KW", tem: "43°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "319v", current: "86.7A", power: "27.7KW", tem: "38°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "313v", current: "0.3A", power: "0.09KW", tem: "31°c", status: 3 },
      { id: "CD1008", voltage: "318v", current: "102.5A", power: "32.6KW", tem: "41°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "312v", current: "0.1A", power: "0.03KW", tem: "29°c", status: 1 },
      { id: "CD1010", voltage: "315v", current: "0.2A", power: "0.06KW", tem: "27°c", status: 4 },
      { id: "CD1011", voltage: "316v", current: "0.1A", power: "0.03KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "0.3A", power: "0.09KW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "317v", current: "0.2A", power: "0.06KW", tem: "30°c", status: 1 },
      { id: "CD1014", voltage: "313v", current: "0.1A", power: "0.03KW", tem: "28°c", status: 5 },
      { id: "CD1015", voltage: "319v", current: "0.2A", power: "0.06KW", tem: "31°c", status: 1 },
      { id: "CD1016", voltage: "315v", current: "94.8A", power: "29.9KW", tem: "40°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "280v", current: "0A", power: "0KW", tem: "58°c", status: 6 },
      { id: "CD1018", voltage: "350v", current: "0A", power: "0KW", tem: "62°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "55°c", status: 6 },

    ],
  },
  {
    id: "VXZ10012",
    name: "福州三坊七巷充电站",
    list: [
      { id: "CD1001", voltage: "318v", current: "0.1A", power: "0.03KW", tem: "30°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "315v", current: "105.2A", power: "33.1KW", tem: "42°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "317v", current: "0.2A", power: "0.06KW", tem: "28°c", status: 1 },
      { id: "CD1004", voltage: "316v", current: "98.5A", power: "31.1KW", tem: "39°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "112.3A", power: "35.3KW", tem: "43°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "319v", current: "86.7A", power: "27.7KW", tem: "38°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "313v", current: "0.3A", power: "0.09KW", tem: "31°c", status: 3 },
      { id: "CD1008", voltage: "318v", current: "102.5A", power: "32.6KW", tem: "41°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "312v", current: "0.1A", power: "0.03KW", tem: "29°c", status: 1 },
      { id: "CD1010", voltage: "315v", current: "0.2A", power: "0.06KW", tem: "27°c", status: 4 },
      { id: "CD1011", voltage: "316v", current: "0.1A", power: "0.03KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "0.3A", power: "0.09KW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "317v", current: "0.2A", power: "0.06KW", tem: "30°c", status: 1 },
      { id: "CD1014", voltage: "313v", current: "0.1A", power: "0.03KW", tem: "28°c", status: 5 },
      { id: "CD1015", voltage: "319v", current: "0.2A", power: "0.06KW", tem: "31°c", status: 1 },
      { id: "CD1016", voltage: "315v", current: "94.8A", power: "29.9KW", tem: "40°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "280v", current: "0A", power: "0KW", tem: "58°c", status: 6 },
      { id: "CD1018", voltage: "350v", current: "0A", power: "0KW", tem: "62°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "55°c", status: 6 },

    ],
  },
  {
    id: "VXZ10013",
    name: "合肥包公园充电站",
    list: [
      { id: "CD1001", voltage: "318v", current: "0.1A", power: "0.03KW", tem: "30°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "315v", current: "105.2A", power: "33.1KW", tem: "42°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "317v", current: "0.2A", power: "0.06KW", tem: "28°c", status: 1 },
      { id: "CD1004", voltage: "316v", current: "98.5A", power: "31.1KW", tem: "39°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "112.3A", power: "35.3KW", tem: "43°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "319v", current: "86.7A", power: "27.7KW", tem: "38°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "313v", current: "0.3A", power: "0.09KW", tem: "31°c", status: 3 },
      { id: "CD1008", voltage: "318v", current: "102.5A", power: "32.6KW", tem: "41°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "312v", current: "0.1A", power: "0.03KW", tem: "29°c", status: 1 },
      { id: "CD1010", voltage: "315v", current: "0.2A", power: "0.06KW", tem: "27°c", status: 4 },
      { id: "CD1011", voltage: "316v", current: "0.1A", power: "0.03KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "0.3A", power: "0.09KW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "317v", current: "0.2A", power: "0.06KW", tem: "30°c", status: 1 },
      { id: "CD1014", voltage: "313v", current: "0.1A", power: "0.03KW", tem: "28°c", status: 5 },
      { id: "CD1015", voltage: "319v", current: "0.2A", power: "0.06KW", tem: "31°c", status: 1 },
      { id: "CD1016", voltage: "315v", current: "94.8A", power: "29.9KW", tem: "40°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "280v", current: "0A", power: "0KW", tem: "58°c", status: 6 },
      { id: "CD1018", voltage: "350v", current: "0A", power: "0KW", tem: "62°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "55°c", status: 6 },
    ],
  },
  {
    id: "VXZ10014",
    name: "重庆解放碑充电站",
    list: [
      { id: "CD1001", voltage: "319v", current: "0.2A", power: "0.06KW", tem: "31°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "318v", current: "108.5A", power: "34.5KW", tem: "44°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "316v", current: "0.1A", power: "0.03KW", tem: "29°c", status: 1 },
      { id: "CD1004", voltage: "317v", current: "96.8A", power: "30.7KW", tem: "40°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "315v", current: "110.3A", power: "34.7KW", tem: "45°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "92.4A", power: "29.0KW", tem: "39°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "313v", current: "0.3A", power: "0.09KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "319v", current: "99.2A", power: "31.6KW", tem: "41°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "312v", current: "0.2A", power: "0.06KW", tem: "28°c", status: 1 },
      { id: "CD1010", voltage: "316v", current: "0.1A", power: "0.03KW", tem: "27°c", status: 4 },
      { id: "CD1011", voltage: "318v", current: "0.2A", power: "0.06KW", tem: "30°c", status: 1 },
      { id: "CD1012", voltage: "315v", current: "0.1A", power: "0.03KW", tem: "26°c", status: 4 },
      { id: "CD1013", voltage: "317v", current: "0.2A", power: "0.06KW", tem: "29°c", status: 1 },
      { id: "CD1014", voltage: "313v", current: "0.1A", power: "0.03KW", tem: "28°c", status: 5 },
      { id: "CD1015", voltage: "319v", current: "0.2A", power: "0.06KW", tem: "31°c", status: 1 },
      { id: "CD1016", voltage: "316v", current: "102.5A", power: "32.4KW", tem: "43°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "290v", current: "0A", power: "0KW", tem: "59°c", status: 6 },
      { id: "CD1018", voltage: "340v", current: "0A", power: "0KW", tem: "63°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "56°c", status: 6 },
    ],
  },
  {
    id: "VXZ10015",
    name: "桂林漓江充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10016",
    name: "苏州园区充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10017",
    name: "昆明滇池充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10018",
    name: "南宁青秀山充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10019",
    name: "长沙橘子洲头充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10020",
    name: "哈尔滨中央大街充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10021",
    name: "石家庄正定古城充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10022",
    name: "兰州黄河桥充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10023",
    name: "济南大明湖充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10024",
    name: "沈阳故宫充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10025",
    name: "福州西湖充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10026",
    name: "无锡灵山大佛充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10027",
    name: "郑州二七广场充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10028",
    name: "大连星海广场充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10029",
    name: "宁波天一广场充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10030",
    name: "贵阳甲秀楼充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10031",
    name: "珠海长隆海洋王国充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },
  {
    id: "VXZ10032",
    name: "天津滨海新区充电站",
    list: [
      { id: "CD1001", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "380v", current: "63A", power: "24KW", tem: "35°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1004", voltage: "380v", current: "80A", power: "30KW", tem: "38°c", status: 2, percent: "45%" },
      { id: "CD1005", voltage: "380v", current: "42A", power: "16KW", tem: "33°c", status: 2, percent: "85%" },
      { id: "CD1006", voltage: "380v", current: "95A", power: "36KW", tem: "40°c", status: 2, percent: "20%" },
      { id: "CD1007", voltage: "380v", current: "0.5A", power: "0.2KW", tem: "30°c", status: 3 },
      { id: "CD1008", voltage: "380v", current: "55A", power: "21KW", tem: "34°c", status: 2, percent: "60%" },
      { id: "CD1009", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 1 },
      { id: "CD1010", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 4 },
      { id: "CD1011", voltage: "220v", current: "0A", power: "0KW", tem: "25°c", status: 1 },
      { id: "CD1012", voltage: "220v", current: "0A", power: "0KW", tem: "28°c", status: 4 },
      { id: "CD1013", voltage: "220v", current: "0A", power: "0KW", tem: "27°c", status: 1 },
      { id: "CD1014", voltage: "220v", current: "0A", power: "0KW", tem: "26°c", status: 5 },
      { id: "CD1015", voltage: "220v", current: "0A", power: "0KW", tem: "29°c", status: 1 },
      { id: "CD1016", voltage: "380v", current: "72A", power: "27KW", tem: "36°c", status: 2, percent: "50%" },
      { id: "CD1017", voltage: "0v", current: "0A", power: "0KW", tem: "21°c", status: 6 },
      { id: "CD1018", voltage: "0v", current: "0A", power: "0KW", tem: "22°c", status: 6 },
      { id: "CD1019", voltage: "0v", current: "0A", power: "0KW", tem: "26°c", status: 6 },
    ],
  },

]

Mock.mock("https://www.demo.com/manage/chargingStation", 'post', () => {
  return {
    code: 200,
    success: true,
    data: chargingPile
  }
})

// 定义 电子地图页面数据 API 接口
const mapStations = [
  {
    position: [116.395645, 39.90923], // 北京（虚拟坐标）
    title: "北京西单充电站",
    status: 1,
    count: 135,
  },
  {
    position: [121.491121, 31.236222], // 上海（虚拟坐标）
    title: "上海陆家嘴充电站",
    status: 2,
    count: 125,
  },
  {
    position: [113.324520, 23.097418], // 广州（虚拟坐标）
    title: "广州花城广场充电站",
    status: 2,
    count: 123,
  },
  {
    position: [114.156836, 22.283758], // 深圳（虚拟坐标）
    title: "深圳大梅沙充电站",
    status: 1,
    count: 110,
  },
  {
    position: [104.065735, 30.659462], // 成都（虚拟坐标）
    title: "成都天府广场充电站",
    status: 5,
    count: 125,
  },
  {
    position: [108.948024, 34.263161], // 西安（虚拟坐标）
    title: "西安钟楼充电站",
    status: 4,
    count: 115,
  },
  {
    position: [120.155070, 30.274084], // 杭州（虚拟坐标）
    title: "杭州西湖充电站",
    status: 1,
    count: 104,
  },
  {
    position: [118.796877, 32.060255], // 南京（虚拟坐标）
    title: "南京夫子庙充电站",
    status: 2,
    count: 129,
  },
  {
    position: [117.200983, 39.084158], // 天津（虚拟坐标）
    title: "天津意大利风情区充电站",
    status: 2,
    count: 123,
  },
  {
    position: [120.308949, 36.065319], // 青岛（虚拟坐标）
    title: "青岛栈桥充电站",
    status: 1,
    count: 123,
  },
  {
    position: [114.305393, 30.593099], // 武汉（虚拟坐标）
    title: "武汉黄鹤楼充电站",
    status: 2,
    count: 102,
  },
  {
    position: [119.296494, 26.074507], // 福州（虚拟坐标）
    title: "福州三坊七巷充电站",
    status: 4,
    count: 107,
  },
  {
    position: [117.283042, 31.86119], // 合肥（虚拟坐标）
    title: "合肥包公园充电站",
    status: 2,
    count: 100,
  },
  {
    position: [106.551556, 29.563009], // 重庆（真实坐标）
    title: "重庆解放碑充电站",
    status: 2,
    count: 117,
  },
  {
    position: [110.290195, 25.273566], // 桂林（虚拟坐标）
    title: "桂林漓江充电站",
    status: 2,
    count: 106,
  },
  {
    position: [120.619585, 31.299379], // 苏州（虚拟坐标）
    title: "苏州园区充电站",
    status: 2,
    count: 115,
  },
  {
    position: [102.833218, 24.879659], // 昆明（虚拟坐标）
    title: "昆明滇池充电站",
    status: 1,
    count: 112,
  },
  {
    position: [108.327546, 22.815478], // 南宁（虚拟坐标）
    title: "南宁青秀山充电站",
    status: 2,
    count: 117,
  },
  {
    position: [112.938814, 28.228209], // 长沙（虚拟坐标）
    title: "长沙橘子洲头充电站",
    status: 2,
    count: 112,
  },
  {
    position: [126.534967, 45.802664], // 哈尔滨（虚拟坐标）
    title: "哈尔滨中央大街充电站",
    status: 2,
    count: 107,
  },
  {
    position: [114.514859, 38.042306], // 石家庄（虚拟坐标）
    title: "石家庄正定古城充电站",
    status: 4,
    count: 103,
  },
  {
    position: [103.834302, 36.061089], // 兰州（虚拟坐标）
    title: "兰州黄河桥充电站",
    status: 5,
    count: 126,
  },
  {
    position: [116.994929, 36.682785], // 济南（虚拟坐标）
    title: "济南大明湖充电站",
    status: 1,
    count: 132,
  },
  {
    position: [123.431474, 41.805699], // 沈阳（虚拟坐标）
    title: "沈阳故宫充电站",
    status: 4,
    count: 108,
  },
  {
    position: [119.302444, 26.080429], // 福州（虚拟坐标）
    title: "福州西湖充电站",
    status: 2,
    count: 113,
  },
  {
    position: [120.31191, 31.498809], // 无锡（虚拟坐标）
    title: "无锡灵山大佛充电站",
    status: 1,
    count: 123,
  },
  {
    position: [113.558519, 34.857641], // 郑州（虚拟坐标）
    title: "郑州二七广场充电站",
    status: 1,
    count: 120,
  },
  {
    position: [121.614682, 38.914003], // 大连（虚拟坐标）
    title: "大连星海广场充电站",
    status: 2,
    count: 117,
  },
  {
    position: [121.551918, 29.874058], // 宁波（虚拟坐标）
    title: "宁波天一广场充电站",
    status: 4,
    count: 130,
  },
  {
    position: [106.713478, 26.578343], // 贵阳（虚拟坐标）
    title: "贵阳甲秀楼充电站",
    status: 1,
    count: 114,
  },
  {
    position: [113.58239, 22.276949], // 珠海（虚拟坐标）
    title: "珠海长隆海洋王国充电站",
    status: 1,
    count: 114,
  },
  {
    position: [117.701648, 39.041746], // 天津（虚拟坐标）
    title: "天津滨海新区充电站",
    status: 1,
    count: 129,
  },
]
Mock.mock("https://www.demo.com/mapList", "post", () => {
  return {
    code: 200,
    success: true,
    data: mapStations
  }
})

Mock.mock("https://www.demo.com/mapform", "post", (params: any) => {
  return {
    code: 200,
    success: true,
    data: params
  }
})

// 订单管理接口
Mock.mock("https://www.demo.com/orderList", "post", (options: any) => {
  const { pageSize } = JSON.parse(options.body);
  console.log("后端订单管理接到参数", JSON.parse(options.body))
  return {
    code: 200,
    success: true,
    data: Mock.mock({
      [`list|${pageSize}`]: [{
        'orderNo': '@string("number", 6)',
        'date': '@date("yyyy-MM-dd")',
        'startTime|1': ['06:41:20', '08:15:50', '10:21:16', '12:47:22', '02:31:11', '04:09:56'],
        'endTime|1': ['14:01:02', '16:12:03', '18:24:16', '20:45:30', '22:23:51'],
        'equipmentNo|1': ['B109','C227','C106','D158','E101', 'F234'],
        'money|25-78': 25,
        'pay|1': ['支付宝','微信','银行卡'],
        'status|1': [2, 3, 4]
      }],
      "total": 73
    })
  }
})

// 订单管理详情接口
Mock.mock("https://www.demo.com/orderDetail", "post", (options: any) => {
  const { order } = JSON.parse(options.body);
  console.log("后端订单详情接到参数", JSON.parse(options.body))
  return {
    code: 200,
    message: '查询成功',
    data: Mock.mock({
      "orderNo": order,
      "date": '2025-08-08',
      "stationName": '北京朝阳区充电站',
      "city": '北京',
      "capacity": '86',
      "equipment|1": ['充电桩(常规)', '充电桩(快充)' ,'充电桩(超快充)'],
      "timeCount": '4',
      "manager": '@cname',
      'managerPhone': /^1[3-9]\d{9}$/,
      "maintenance": '@cname',
      'maintPhone': /^1[3-9]\d{9}$/,      
      "startTime|1": ['06:41:20', '08:15:50', '10:21:16', '12:47:22', '02:31:11', '04:09:56'],
      'endTime|1': ['14:01:02', '16:12:03', '18:24:16', '20:45:30', '22:23:51'],
      "equipmentNo|1": ['B109','C227','C106','D158','E101', 'F234'],
      "money": 41.2,
      "pay|1": ['支付宝','微信','银行卡'],
      "service": 4,
      "parking": 12.2,
      "electricity": 25,
      "remark": '暂无',
      "status|1": [2, 3, 4]
    }),
  }
})


// 订单管理删除接口
Mock.mock("https://www.demo.com/orderDelete", "post", (options: any) => {
  const { order } = JSON.parse(options.body)
  console.log('订单管理删除接口：', JSON.stringify(order))
  return {
    code: 200,
    message: "成功",
    data: '操作成功'
  }
})


const cityList = [
  {
    label: "北京总部",
    children: [
      {
        label: "东城区",
        children: [
          { label: "东城区充电站01" },
          { label: "东城区充电站02" },
          { label: "东城区充电站03" },
          { label: "东城区充电站04" },
        ]
      },
      {
        label: "西城区",
        children: [
          { label: "西城区充电站01" },
          { label: "西城区充电站02" },
          { label: "西城区充电站03" },
        ]
      },
      {
        label: "朝阳区",
        children: [
          { label: "朝阳区充电站01" },
          { label: "朝阳区充电站02" },
          { label: "朝阳区充电站03" },
        ]
      },
      {
        label: "海淀区",
        children: [
          { label: "海淀区充电站01" },
          { label: "海淀区充电站02" },
        ]
      },
      {
        label: "丰台区",
        children: [
          { label: "丰台区充电站01" },
          { label: "丰台区充电站02" },
        ]
      }

    ]
  },
  {
    label: "深圳总部",
    children: [
      {
        label: "南山区",
        children: [
          {
            label: "南山区充电站01"
          }
        ]
      }, {
        label: "福田区",
        children: [
          {
            label: "福田区充电站01"
          }
        ]
      }
    ]
  }, {
    label: "青岛市",
    children: [
      {
        label: "市南区",
        children: [
          {
            label: "市南区充电站01"
          },
          {
            label: "市南区充电站02"
          }
        ]
      },
      {
        label: "市北区",
        children: [
          {
            label: "市北区充电站01"
          },
          {
            label: "市北区充电站02"
          }
        ]
      },
      {
        label: "崂山区",
        children: [
          {
            label: "崂山区充电站01"
          },
          {
            label: "崂山区充电站02"
          }
        ]
      }
    ]
  },
  {
    label: "武汉市",
    children: [
      {
        label: "武汉充电站01"
      },
      {
        label: "武汉充电站02"
      }, {
        label: "武汉充电站03"
      }
    ]
  }, {
    label: "成都市",
    children: [
      {
        label: "成都充电站01"
      },
      {
        label: "成都充电站02"
      }, {
        label: "成都充电站03"
      }
    ]
  },
  {
    label: "上海市",
    children: [
      {
        label: "上海充电站01"
      },
      {
        label: "上海充电站02"
      }, {
        label: "上海充电站03"
      }
    ]
  },
  {
    label: "长沙市",
    children: [
      {
        label: "长沙充电站01"
      },
      {
        label: "长沙充电站02"
      }, {
        label: "长沙充电站03"
      }
    ]
  }
]

//计费管理城市接口
Mock.mock('https://www.demo.com/cityList', "get", () => {
  return {
    code: 200,
    message: "操作成功",
    data: cityList
  }
})


//计费管理模板接口
Mock.mock('https://www.demo.com/totalForm', "post", (options: any) => {
  const  formData  = JSON.parse(options.body)
  console.log('计费管理模板接口：', formData)
  return {
    code: 200,
    message: "操作成功",
    data: '操作成功'
  }
})


//报警管理-报警列表接口
const alarmList = [
  {
    description: "充电桩插头拿不下来",
    address: "北京市东城区",
    equNo: "CD1001",
    level: 1,//1严重 2紧急 3一般
    time: "2024-09-15 09:33:24",
    code: 10023,//故障代码
    status: 1,//1待指派 2处理中 处理异常
  },
  {
    description: "充电控制系统异常",
    address: "上海市浦东新区",
    equNo: "CD1002",
    level: 2,
    time: "2024-09-16 10:15:00",
    code: 10024,
    status: 2,
  },
  {
    description: "充电结束未通知",
    address: "广州市天河区",
    equNo: "CD1003",
    level: 3,
    time: "2024-09-17 11:28:45",
    code: 10025,
    status: 1,
  },
  {
    description: "设备显示屏故障",
    address: "深圳市南山区",
    equNo: "CD1004",
    level: 1,
    time: "2024-09-18 14:05:12",
    code: 10026,
    status: 1,
  },
  {
    description: "无法启动充电",
    address: "重庆市渝中区",
    equNo: "CD1005",
    level: 2,
    time: "2024-09-19 08:43:09",
    code: 10027,
    status: 2,
  },
  {
    description: "充电枪接触不良",
    address: "杭州市西湖区",
    equNo: "CD1006",
    level: 3,
    time: "2024-09-20 13:17:38",
    code: 10028,
    status: 3,
  },
  {
    description: "设备漏电报警",
    address: "成都市武侯区",
    equNo: "CD1007",
    level: 1,
    time: "2024-09-21 07:26:55",
    code: 10029,
    status: 2,
  },
  {
    description: "设备故障",
    address: "南京市鼓楼区",
    equNo: "CD1008",
    level: 2,
    time: "2024-09-22 12:34:10",
    code: 10030,
    status: 1,
  },
  {
    description: "设备故障",
    address: "成都市金牛区",
    equNo: "CD1009",
    level: 2,
    time: "2024-09-23 15:45:20",
    code: 10031,
    status: 3,
  },
  {
    description: "设备故障",
    address: "温州市鹿城区",
    equNo: "CD1010",
    level: 2,
    time: "2024-09-24 18:56:30",
    code: 10032,
    status: 2,
  },
  {
    description: "设备故障",
    address: "杭州市西湖区",
    equNo: "CD1011",
    level: 2,
    time: "2024-09-25 20:12:45",
    code: 10033,
    status: 1,
  },
  {
    description: "设备故障",
    address: "广州市白云区",
    equNo: "CD1012",
    level: 2,
    time: "2024-09-26 22:30:00",
    code: 10034,
    status: 3,
  },
  {
    description: "设备故障",
    address: "北京市朝阳区",
    equNo: "CD1013",
    level: 2,
    time: "2024-09-27 23:45:50",
    code: 10035,
    status: 1,
  },
  {
    description: "设备故障",
    address: "沈阳市和平区",
    equNo: "CD1014",
    level: 2,
    time: "2024-09-27 23:45:50",
    code: 10036,
    status: 1,
  },
  {
    description: "设备故障",
    address: "大连市中山区",
    equNo: "CD1015",
    level: 1,
    time: "2024-09-27 23:45:50",
    code: 10037,
    status: 2,
  },

]

Mock.mock('https://www.demo.com/alarmList', "get", () => {
  return {
    code: 200,
    message: "操作成功",
    data: alarmList
  }
})

// 报警任务指派接口
Mock.mock("https://www.demo.com/assignAlarm", "post", (params: any) => {
  const formData = JSON.parse(params.body)
  console.log('报警任务指派接口',formData)
  return {
    code: 200,
    message: "操作成功",
    data:'报警任务指派成功'
  }
})


// 会员卡管理接口
Mock.mock('https://www.demo.com/member', 'post', (req:any) => {
  const { page, pageSize, memberCardNumber, holderName, holderPhone } = JSON.parse(req.body);
  console.log("会员管理接口",page, pageSize,memberCardNumber, holderName, holderPhone)
  return {
    "code": 200,
    "message": "操作成功",
    data: Mock.mock({
      [`list|${pageSize}`]:[{
        'memberCardNumber': '@id',  // 会员卡号
        'cardType|1': ["普通卡", "VIP卡", "季卡"],  // 卡类型
        'issueDate': '@date("yyyy-MM-dd")',  // 开卡日期
        'holderName': '@cname',  // 持有人姓名
        'holderPhone': /^1[3-9]\d{9}$/,  // 持有人电话
        'cardBalance': '@float(100, 10000, 2, 2)',  // 卡余额
        'transactionRecords|1-5': [{  // 消费记录
            'transactionDate|1': ["2025-06-18","2025-08-08","2025-10-03","2025-10-15"],  // 消费日期
            'transactionAmount': '@float(10, 500, 2, 2)',  // 消费金额
            'transactionType|1': ["充电扣款", "服务费扣款", "停车费扣款", "其他"]  // 消费类型
        }],
        'validUntil': '@date("yyyy-MM-dd")'  // 有效期至
    }],
    total:53
    })
  }
})


// 招商管理分类列表接口
Mock.mock('https://www.demo.com/business/type',"get",()=>{
  return {
    code:200,
    message:"操作成功",
    data:{
      type:["招商类","广告类","公告类","提示类","日常类","告警类","其他"],//文章类型
      important:["一级","二级","三级","四级"],//重要程度
      publish:["站内信","公众号","小程序","H5","官网"]//发布渠道
    }
  }
})

// 招商管理提交接口
Mock.mock('https://www.demo.com/business/submit',"post",(req:any)=>{
  const formData = JSON.parse(req.body)
  console.log('招商管理提交接口',formData)
  return {
    code:200,
    message:"操作成功",
    data:"提交成功"
  }
})


// 自定义生成随机账号函数
Mock.Random.extend({
  account: function() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = Mock.mock('@natural(6, 10)')
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
})
// 权限设置接口
Mock.mock('https://www.demo.com/systemList','post',(req:any)=>{
  const {pageSize} = JSON.parse(req.body);
  console.log("权限设置接口收到参数",JSON.parse(req.body)) 
return {
    code:200,
    message:"操作成功",
    data:Mock.mock({
      [`list|${pageSize}`]:[{
        'name': '@cname',  // 姓名
        'account': '@account',//账号
        'phone': /^1[3-9]\d{9}$/,  // 电话
        'idNo': '@id',  // 身份证号
        'position|1':["客服专员",'客服经理','市场专员',"市场经理","运营专员","运营经理","技术工程师","技术经理","Boss"],//职位
        'department|1':['总裁办','技术部','市场部','维修部','运营部','客服部'],//所属部门
        "pageAuthority|1":['admin','manager','user','自定义权限'],//页面权限
        'btnAuthority|1':['add','delete','edit','all','自定义权限'],//按钮权限
    }],
    total:41
    })
  }
})


const userMenulist = [
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
//获取当前用户权限
Mock.mock("https://www.demo.com/userAuth","post",(req:any)=>{
 const {pageAuthority}=JSON.parse(req.body)
  console.log("后端收到当前权限",pageAuthority)
  return {
    code:200,
    message:"操作成功",
    data:{
      list:pageAuthority=="user"? userMenulist:(pageAuthority=="manager"?menulist2:menulist),
      btn:pageAuthority=="user"?['add']:(pageAuthority=="manager"?['add',"edit"]:['add','edit','delete'])
    }
  }
})

//权限设置接口
Mock.mock("https://www.demo.com/setAuth","post",(req:any)=>{
  const {btnList,pageList,account}=JSON.parse(req.body)
  console.log("权限设置接口修改账号权限",account,btnList,pageList)
  return{
    code:200,
    message:"操作成功",
    data:null
  }
})

// 权限设置删除接口
Mock.mock("https://www.demo.com/deleteAuth","post",(req:any)=>{
  const {account}=JSON.parse(req.body)
  console.log("权限设置删除接口",account)
  return{
    code:200,
    message:"删除成功",
    data:'success'
  }
})

// 权限设置禁用接口
Mock.mock("https://www.demo.com/disableAuth","post",(req:any)=>{
  const {account}=JSON.parse(req.body)
  console.log("权限设置禁用接口",account)
  return{
    code:200,
    message:"禁用成功",
    data:'success'
  }
})

// 个人中心个人信息接口
Mock.mock("https://www.demo.com/personalInfo","post",(req:any)=>{
  const {token}=JSON.parse(req.body)
  console.log("个人中心个人信息接口",token)
  return{
    code:200,
    message:"操作成功",
    data:{
      name:"张三",
      phone:"13800000000",
      address:'北京市海淀区',
      personalTag:["认真","努力","热爱生活"]
    }
  }
})

// 个人中心修改个人信息接口
Mock.mock("https://www.demo.com/personalInfo/change","post",(req:any)=>{
  const formData = JSON.parse(req.body)
  console.log("个人中心修改个人信息接口",formData)
  return{
    code:200,
    message:"操作成功",
    data:'success'
  }
})


// 个人中心消息通知接口
Mock.mock("https://www.demo.com/personalInfo/notice","post",(req:any)=>{
  const {token}=JSON.parse(req.body)
  console.log("个人中心消息通知接口",token)
  return{
    code:200,
    message:"操作成功",
    data:{
      infoType: [
        {
          type:'待办事项',
          count:10
        },
        {
          type:'指派事件',
          count:7
        },
        {
          type:'其他',
          count:2
        },
        {
          type:'站内信',
          count:2
        },
        {
          type:'部门公告',
          count:2
        },
      ],
      notice:[
        {
          type:'其他',
          title:"个人信息修改通知",
          content:"您的个人信息已被修改",
          time:"2025-01-01"
        },
        {
          type:'其他',
          title:"密码修改通知",
          content:"您的密码已被修改",
          time:"2025-01-02"
        },
        {
          type:'站内信',
          title:"系统升级完成通知",
          content:"请各站点重新绑定充电桩设备",
          time:"2025-08-26"
        },
        {
          type:'站内信',
          title:"充电站上线通知",
          content:"成都金牛区充电站已上线",
          time:"2025-07-22"
        },
        {
          type:'部门公告',
          title:'运营管理部',
          content:'所有在营公共充电桩价格公示标准化​',
          time:"2025-08-26"
        },
        {
          type:'部门公告',
          title:'人事部',
          content:'下周进行人事招聘审核​',
          time:"2025-08-06"
        },
        {
          type:'指派事件',
          title:'紧急工单分配01',
          content:'充电桩ID：CDZ-SH-0783B过温告警​',
          time:"2025-08-26"
        },
        {
          type:'指派事件',
          title:'紧急工单催促02',
          content:'充电桩ID：CDZ-BJ-1092A通信中断​',
          time:"2025-08-26"
        },
        {
          type:'指派事件',
          title:'紧急工单分配03',
          content:'充电桩ID：CDZ-GZ-2056C支付系统失效​',
          time:"2025-08-26"
        },
        {
          type:'指派事件',
          title:'紧急工单分配04',
          content:'充电桩ID：CDZ-SZ-3087D接地故障​',
          time:"2025-08-26"
        },
        {
          type:'指派事件',
          title:'紧急工单催促05',
          content:'充电桩ID：CDZ-HZ-4123F显示模块失效​',
          time:"2025-08-26"
        },
        {
          type:'指派事件',
          title:'紧急工单分配06',
          content:'充电桩ID：CDZ-CQ-5166G机械卡死​',
          time:"2025-08-26"
        },
        {
          type:'指派事件',
          title:'紧急工单分配07',
          content:'充电桩ID：CDZ-NJ-6245H输出超限',
          time:"2025-08-26"
        },
        {
          type:'待办事项',
          title:'工单待分配',
          content:'充电桩ID：CDZ-BJ-1092A通信中断​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'支付异常审核​',
          content:'站点P3停车场扫码支付失败率100%​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'分成规则更新​',
          content:'站点“科技园B座”新增分成方​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'营销活动配置​',
          content:'中秋储值卡推广​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'计量器具送检​',
          content:'浦东XX园区A区12台直流桩计量误差待检​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'员工权限开通​',
          content:'新员工张小小（手机135​*​2541）需开通设备管理​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'实体卡挂失处理​',
          content:'卡号CD20250826-001挂失申请​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'月度对账导出​',
          content:'7月资金流水报表待导出（范围：7.1-7.31）​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'​​故障设备复检​',
          content:'过温桩CDZ-SH-0783B维修后需48小时稳定性测试​',
          time:"2025-08-28"
        },
        {
          type:'待办事项',
          title:'​​用户退款审核',
          content:'需审核50元补偿券发放记录​',
          time:"2025-08-28"
        },
      ]
    }
  }
})
