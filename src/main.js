import Vue from 'vue'
import App from './App'
import router from './router'
import http from './http/http'
import charts from './components'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.use(charts)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
