import Vue from 'vue'
import Vuex from 'vuex'
import basic from './modules/basic'
import common from './modules/common'
import addAttendance from './modules/behaviorManager'
import Persistedstate from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    basic,
    common,
    addAttendance
  },
  plugins: [Persistedstate({storage: window.sessionStorage})]
})
