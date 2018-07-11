// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Index from './index.vue'
import VueRouter from 'vue-router'
import router from './router'
import '@/assets/fonts/iconfont/iconfont.css'
import '@/modules/common/less/common.less'

if (process.env.NODE_ENV === 'development') {
  require('@/mock')
}

Vue.use(VueRouter)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Index },
  template: '<Index/>',
  router
})
