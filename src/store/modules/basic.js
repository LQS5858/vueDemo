import $http from '@/assets/js/http'
import common from './common'

const basic = {
  state: {
    timestamp: 0,
    projectLevel: [],
    scoreLevel: [],
    staff: [],
    department: [],
    quarter: [],
    departmentTree: {},
    ratingRules: {}
  },
  getters: {},
  mutations: {
    async GET_BASIC (state) {
      let updateTimestamp = await $http({
        url: 'basic/timestamp'
      })
      $http({
        url: 'basic/staff'
      }).then(data => {
        state.staff = data
      })
      // 判断是否要更新基础数据
      if (state.timestamp === updateTimestamp) return
      $http({
        url: 'basic/score-level'
      }).then(data => {
        state.scoreLevel = data
      })
      $http({
        url: 'basic/project-level'
      }).then(data => {
        state.projectLevel = data
      })
      $http({
        url: 'basic/department'
      }).then(data => {
        state.department = data
      })
      $http({
        url: 'basic/quarter'
      }).then(data => {
        common.state.quarterId = data[0].id
        state.quarter = data
      })
      $http({
        url: 'dept/tree'
      }).then(data => {
        state.departmentTree = data
      })
      $http({
        url: 'basic/score-rating-rules'
      }).then(data => {
        state.ratingRules = data
      })
      state.timestamp = updateTimestamp
    }
  },
  actions: {
    getBasicData ({commit}) {
      commit('GET_BASIC')
    }
  }
}

export default basic
