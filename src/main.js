// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/assets/js/http'
import utils from '@/assets/js/utils'
import filters from '@/assets/js/filters'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)

for (let key in filters) {
  Vue.filter(key, filters[key])
}

Vue.prototype.$http = http
Vue.prototype.$utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
