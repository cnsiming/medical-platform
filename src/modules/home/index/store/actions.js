import {
  getCartNum
} from '@/fetch/index'

const actions = {
  UPDATE_CARNUM: ({commit, state}, payload) => {
    return getCartNum().then(res => commit('UPDATE_CARNUM', {payload: res.data}))
  },

  LOGIN: ({commit, state}, payload) => {
    return commit('LOGIN', {payload})
  }
}

export default actions
