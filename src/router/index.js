import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/views/homepage/IndexPage'
import showPage from '@/views/parkShow/index'
import managementPage from '@/views/parkManagement/index'
import Test from '@/views/HelloWorld'
import hatch from '@/views/parkHatch'
import monitor from '@/views/parkMonitor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/index',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/test',
      name: 'HelloWorld',
      component: Test
    },
    {
      path: '/show',
      name: '园区展示',
      component: showPage
    },
    {
      path: '/management',
      name: '园区管控',
      component: managementPage
    }
    ,
    {
      path: '/hatch',
      name: '孵化管理',
      component: hatch
    }
    ,
    {
      path: '/monitor',
      name: '视频监控',
      component: monitor
    }
  ]
})
