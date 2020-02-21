import _ from 'lodash';
import Vue from 'vue';
const hasAuth = Vue.prototype.$utils.hasAuth;

export const AUTH_VIEW = _.memoize(() => {
  return hasAuth('OperationCenter.Homepage.view');
});

// 编辑权限
export const AUTH_EDIT = _.memoize(() => {
  return hasAuth('OperationCenter.Homepage.edit');
});

// 删除权限
export const AUTH_DELETE = _.memoize(() => {
  return hasAuth('OperationCenter.Homepage.delete');
});

export default {
  AUTH_VIEW,
  AUTH_EDIT,
  AUTH_DELETE,
};
