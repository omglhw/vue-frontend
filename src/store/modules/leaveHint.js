/**
 * 浏览器和路由离开提示状态
 */
const state = {
  showLeaveHint: false,
  leaveHintVisible: false,

  routerNext: ''

};

const actions = {

};
const mutations = {
  setShowLeaveHint (state, showLeaveHint) {
    state.showLeaveHint = showLeaveHint;
  },
  setLeaveHintVisible (state, leaveHintVisible) {
    state.leaveHintVisible = leaveHintVisible;
  },
  setRouterNext (state, next) {
    state.routerNext = next;
  }

};

const getters = {

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
