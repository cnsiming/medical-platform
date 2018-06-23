// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Index from './index.vue'

import '@/assets/fonts/iconfont/iconfont.css'
import '@/modules/common/less/common.less'
if (process.env.NODE_ENV === 'development') {
  require('@/mock')
}

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Index },
  template: '<Index/>'
})
