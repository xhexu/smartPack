import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/views/homepage/IndexPage'
import showPage from '@/views/parkShow/index'
import managementPage from '@/views/parkManagement/index'
import buildingA from '@/views/parkManagement/buildingA'
import buildingB from '@/views/parkManagement/buildingB'
import Test from '@/views/HelloWorld'
import hatch from '@/views/parkHatch'
import monitor from '@/views/parkMonitor'
import Login from '@/views/Login/Login'
import Register from '@/views/Login/Register'
import ForgetPwd from '@/views/Login/ForgetPwd'

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
      path: '/buildingA',
      name: '园区管控A栋',
      component: buildingA
    }
    ,
    {
      path: '/buildingB',
      name: '园区管控B栋',
      component: buildingB
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
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/forgetPwd',
      name: 'forgetPwd',
      component: ForgetPwd
    }
  ]
})
