import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/views/IndexPage/IndexPage2'
import showPage from '@/views/parkShow/index'
import managementPage from '@/views/parkManagement/index'
import buildingA from '@/views/parkManagement/buildingA'
import buildingB from '@/views/parkManagement/buildingB'
import Index from '@/views/index'
import hatch from '@/views/parkHatch'
import monitor from '@/views/parkMonitor'
import monitorDetail from '@/views/parkMonitor/monitorDetail'
import videoDetail from '@/views/parkMonitor/videoDetail'
import Login from '@/views/Login/Login'
import Register from '@/views/Login/Register'
import ForgetPwd from '@/views/Login/ForgetPwd'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
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
    },
    {
      path: '/videoDetail',
      name: '监控详情',
      component: videoDetail
    },
    {
      path: '/index',
      component: Index,
      children:[
        {
          path: '/index',
          redirect: '/parkanalyze'
        },
        {
          path: '/parkanalyze',
          component: IndexPage
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
        },{
          path: '/monitorDetail',
          name: '视频监控',
          component: monitorDetail
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
    //后续这里增加是否登录校验
  var userInfo = window.localStorage.getItem('access_token');//获取浏览器缓存的用户信息
  if(userInfo){ //如果有就直接到首页
    next();
  } else {
    if(to.path=='/login' || to.path=='/register' || to.path=='/forgetPwd'){ //如果是登录页面路径，就直接next()
      next();
    } else { //不然就跳转到登录；
      next('/login');
    }
  }
})

export default router
