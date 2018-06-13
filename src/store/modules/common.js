
const common = {
  state: {
    quarterId: 1,
    user: {},
    navList: ['首页']
  },
  getters: {
  },
  mutations: {
    SET_QUARTER_ID (state, id) {
      state.quarterId = id
    },
    SET_USER (state, data) {
      state.user = data
      // 反设置到localStorage
      localStorage.setItem('user', JSON.stringify(data))
    },
    SET_NAVLIST (state, data) {
      console.log(data, 5555)
      state.navList = data
      console.log(state.navList, 6666)
    }
  },
  actions: {
    setQuarterId ({commit}, id) {
      commit('SET_QUARTER_ID', id)
    },
    setUser ({commit}, data) {
      commit('SET_USER', data)
    },
    setNavList ({commit}, data) {
      commit('SET_NAVLIST', data)
    }
  }
}

export default common
