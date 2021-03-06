import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import persistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {
  carNum: 10,
  login: false
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [persistedstate({
    key: 'xpt'
  })]
})
