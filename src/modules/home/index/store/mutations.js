const mutations = {
  UPDATE_CARNUM: (state, {
    payload
  }) => {
    state.carNum = payload
  },

  LOGIN: (state, {
    payload
  }) => {
    state.login = payload
  }
}

export default mutations
