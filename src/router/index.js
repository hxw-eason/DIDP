import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/maindata',
    component: Layout,
    redirect: '/maindata/complex-table',
    name: 'maindata',
    meta: {
      title: '主数据',
      icon: 'table'
    },
    children: [
      { path: 'complex-table', component: () => import('@/views/maindata/complexTable'), name: 'complexTable', meta: { title: '供应商例子' }},
      { path: 'supplier', component: () => import('@/views/maindata/supplier'), name: 'supplier', meta: { title: '供应商信息管理' }},
      { path: 'customer', component: () => import('@/views/maindata/customer'), name: 'customer', meta: { title: '客户信息管理' }}
    ]
  },
  {
    path: '/basicdata',
    component: Layout,
    redirect: 'noredirect',
    name: 'basicdata',
    meta: {
      title: '基础数据',
      icon: 'chart'
    },
    children: [
      { path: 'system', component: () => import('@/views/basicdata/system'), name: 'system', meta: { title: '系统注册', noCache: true }},
      { path: 'currency', component: () => import('@/views/basicdata/currency'), name: 'currency', meta: { title: '货币信息', noCache: true }},
      { path: 'company', component: () => import('@/views/basicdata/company'), name: 'company', meta: { title: '分子公司', noCache: true }},
      { path: 'sales', component: () => import('@/views/basicdata/sales'), name: 'sales', meta: { title: '营业部', noCache: true }},
      { path: 'agency', component: () => import('@/views/basicdata/agency'), name: 'agency', meta: { title: '办事处', noCache: true }},
      { path: 'accounting', component: () => import('@/views/basicdata/accounting'), name: 'accounting', meta: { title: '会计主体', noCache: true }},
      { path: 'country', component: () => import('@/views/basicdata/country'), name: 'country', meta: { title: '国家信息', noCache: true }},
      { path: 'province', component: () => import('@/views/basicdata/province'), name: 'province', meta: { title: '省份信息', noCache: true }},
      { path: 'city', component: () => import('@/views/basicdata/city'), name: 'city', meta: { title: '城市信息', noCache: true }}
    ]
  },
  {
    path: '/systemmang',
    component: Layout,
    redirect: 'noredirect',
    name: 'systemmang',
    meta: {
      title: '系统管理',
      icon: 'example'
    },
    children: [
      { path: 'configuration', component: () => import('@/views/systemmang/configuration'), name: 'configuration', meta: { title: '主数据属性配置', noCache: true }},
      { path: 'pushlogs', component: () => import('@/views/systemmang/pushlogs'), name: 'pushlogs', meta: { title: '主数据推送日志', noCache: true }}
    ]
  }
]
