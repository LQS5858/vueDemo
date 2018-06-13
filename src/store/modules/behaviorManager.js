const addAttendance = {
  state: {
    dialogTableVisible: false,
    boxTitle: '',
    behaviorData: { isShowBehaviorBtn: true, isShowOperationDetail: false }
  },
  mutations: {
    HIDEN_BEHAVIOR_BTN (state) {
      state.behaviorData.isShowBehaviorBtn = false
      state.behaviorData.isShowOperationDetail = true
    },
    SHOW_BEHAVIOR_BTN (state) {
      state.behaviorData.isShowBehaviorBtn = true
    },
    SHOW_DIALOG (state) {
      state.dialogTableVisible = true
    },
    HIDEN_DIALOG (state) {
      state.dialogTableVisible = false
    },
    UPDATE_DIALOG_TITLE (state, value) {
      state.boxTitle = value
    }
  },
  actions: {
    dialogShow ({ commit }) {
      commit('SHOW_DIALOG')
    },
    hidenDialog ({ commit }) {
      commit('HIDEN_DIALOG')
    },
    updateDialogTitle ({ commit }, value) {
      commit('UPDATE_DIALOG_TITLE', value)
    }
  }
}
export default addAttendance
