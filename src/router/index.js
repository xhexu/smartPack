import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/views/homepage/IndexPage'
import Test from '@/views/HelloWorld'

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
      component: Test
    },
    {
      path: '/test',
      name: 'IndexPage',
      component: Test
    }
  ]
})
