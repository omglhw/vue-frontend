import {
  APIS
} from '@/api';
import Vue from 'vue';
const state = {
  // 组织列表
  orgDatas: '',
  // 用户列表
  users: [],
};

const mutations = {
  setOrgDatas (state, orgDatas) {
    state.orgDatas = orgDatas;
  },
  setUsers (state, users) {
    state.users = users;
  },
};

const actions = {
// 获取公司列表
  getOrg ({ commit, state }, { pagination } = {}) {
    Vue.$http
      .get(APIS.Organization.searchByProjAuth)
      .then(res => {
        if (res.errcode === 0) {
          if (res.data && Array.isArray(res.data.orgTree)) {
            if (res.data.orgTree.length > 0) {
              commit('setOrgDatas', res.data.orgTree[0].childList);
            }
          }
        }
      });
  },
  // 获取公司列表
  getUsers ({ commit, state }, { keyword } = {}) {
    const params = {
      keyword
    };
    return Vue.$http
      .get(APIS.LogCenter.getUsers, {
        params
      })
      .then(res => {
        if (res.errcode === 0) {
          if (res.data && Array.isArray(res.data)) {
            commit('setUsers', res.data);
          } else {
            commit('setUsers', []);
          }
        }
        return Promise.resolve(res);
      });
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
