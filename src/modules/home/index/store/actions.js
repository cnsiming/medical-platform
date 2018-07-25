import {
  getCartNum
} from '@/fetch/index'

const actions = {
  UPDATE_CARNUM: ({commit, state}, payload) => {
    console.log('UPDATE_CARNUM')
    return getCartNum().then(res => commit('UPDATE_CARNUM', {payload: res.data}))
  }
}
export default actions
