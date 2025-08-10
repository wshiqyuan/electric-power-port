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
          data:[20,50,30,70,60,80,40,60,50]
        },
        {
          name:'充电时长',
          data:[40,60,50,80,70,90,60,70,80]
        },
        {
          name:'充电功率',
          data:[30,40,60,50,70,20,30,40,60]
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