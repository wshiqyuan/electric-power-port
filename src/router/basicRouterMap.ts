import { type RouteRecordRaw } from 'vue-router'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('@/layouts/DefaultLayout.vue'),
    redirect:'/dashboard',
    children:[
      {
        path:'/dashboard',
        name:'Dashboard',
        component:()=>import('@/views/dashboard/Dashboard.vue')
      },
      {
        path: '/chargingstation/manage',
        name:'Manage',
        component:()=>import('@/views/chargingstation/Manage.vue')
      },
      {
        path: '/chargingstation/monitor',
        name:'Monitor',
        component:()=>import('@/views/chargingstation/Monitor.vue')
      },
      {
        path:'/chargingstation/revenue',
        name:'Revenue',
        component:()=>import('@/views/chargingstation/Revenue.vue')
      },
      {
        path:'/map',
        name:'Map',
        component:()=>import('@/views/map/ElectronicMap.vue')
      },
      {
        path:'/operations/orders',
        name:'Orders',
        component:()=>import('@/views/operations/Orders.vue')
      },
      {
        path:'/operations/detail',
        name:'Detail',
        component:()=>import('@/views/operations/Detail.vue')
      },
      {
        path:'/operations/total',
        name:'Total',
        component:()=>import('@/views/operations/Total.vue')
      },
      {
        path:'/alarm',
        name:'Alarm',
        component:()=>import('@/views/alarm/Alarm.vue')
      },
      {
        path:'/member',
        name:'Member',
        component:()=>import('@/views/member/Member.vue')
      },
      {
        path:'/business',
        name:'Business',
        component:()=>import('@/views/business/Business.vue'),
        meta:{
          needAuth:['admin','manager']
        }
      },
      {
        path:'/system',
        name:'System',
        component:()=>import('@/views/system/System.vue'),
        meta:{
          needAuth:['admin']
        }
      },
      {
        path:'/personal',
        name:'Personal',
        component:()=>import('@/views/personal/Personal.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

export default routes