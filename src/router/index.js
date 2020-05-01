import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Goods from '@/views/Goods.vue'
import Check from '@/views/Check.vue'
import Store from '@/views/Store.vue'
import Member from '@/views/Member.vue'
import Statistics from '@/views/Statistics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/',name:'Check',component:Check},
      {path:'/store',name:'Store',component:Store},
      {path:'/goods',name:'Goods',component:Goods},
      {path:'/member',name:'Member',component:Member},
      {path:'/statistics',name:'Statistics',component:Statistics},
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
