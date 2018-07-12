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
    path: '/maindataconfig',
    component: Layout,
    redirect: 'noredirect',
    name: 'maindataconfig',
    meta: {
      title: '主数据配置',
      icon: 'component'
    },
    children: [
      { path: 'datadistri', component: () => import('@/views/maindataconfig/datadistri'), name: 'datadistri', meta: { title: '主数据分发', noCache: true }},
      { path: 'datareception', component: () => import('@/views/maindataconfig/datareception'), name: 'datareception', meta: { title: '主数据接收', noCache: true }},
      { path: 'datadictionary', component: () => import('@/views/maindataconfig/datadictionary'), name: 'datadictionary', meta: { title: '主数据数据字典', noCache: true }},
      { path: 'datapermission', component: () => import('@/views/maindataconfig/datapermission'), name: 'datapermission', meta: { title: '主数据访问权限', noCache: true }}
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
      { path: 'datamanagement', component: () => import('@/views/systemmang/datamanagement'), name: 'datamanagement', meta: { title: '数据大小类管理', noCache: true }},
      { path: 'rolemanagement', component: () => import('@/views/systemmang/rolemanagement'), name: 'rolemanagement', meta: { title: '角色管理', noCache: true }},
      { path: 'usermanagement', component: () => import('@/views/systemmang/usermanagement'), name: 'usermanagement', meta: { title: '用户管理', noCache: true }},
      { path: 'system', component: () => import('@/views/systemmang/system'), name: 'system', meta: { title: '系统注册', noCache: true }},
      { path: 'permissiongl', component: () => import('@/views/systemmang/permissiongl'), name: 'permissiongl', meta: { title: '权限管理', noCache: true }}
    ]
  },
  {
    path: '/logmanagement',
    component: Layout,
    redirect: 'noredirect',
    name: 'logmanagement',
    meta: {
      title: '日志管理',
      icon: 'bug'
    },
    children: [
      { path: 'receivelog', component: () => import('@/views/logmanagement/receivelog'), name: 'receivelog', meta: { title: '主数据接收日志', noCache: true }},
      { path: 'pushlog', component: () => import('@/views/logmanagement/pushlog'), name: 'pushlog', meta: { title: '主数据推送日志', noCache: true }},
      { path: 'systemlog', component: () => import('@/views/logmanagement/systemlog'), name: 'systemlog', meta: { title: '系统日志', noCache: true }}
    ]
  }
]
