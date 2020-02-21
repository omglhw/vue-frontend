import Vue from 'vue';
import layout from '@yl/vue-saas-layout';
import '@yl/vue-saas-layout/theme/index.css';
import '@yl/vue-saas-layout/dist/vue-saas-layout.css';
import config from '@/config';

const codeMessage = {
  400: '发出的请求有错误。',
  401: '请求要求身份验证。',
  403: '没有权限访问。',
  404: '服务器找不到请求的网页。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除。',
  500: '服务器发生错误。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
/**
     * 提示函数
     */
const $message = (() => {
  if (Vue.prototype.$message) {
    return Vue.prototype.$message;
  } else {
    return {
      error (msg) {
        console.error(msg);
      },
      warning (msg) {
        console.warn(msg);
      }
    };
  }
})();
Vue.use(layout, {
  // 框架基础接口
  baseURL: config.baseApi,
  // 登录接口
  loginURL: config.loginURL,
  showTopNavs: config.showTopNavs,
  showLeftMenus: config.showLeftMenus,
  httpSuccess: (response) => {
    const data = response.data;

    if (data.errcode === 0 || data.code === 200) {
      // 成功时返回data
      // return Promise.resolve(data);
    } else if (data.message) {
      let globalMsg = true;
      if (response.config && response.config.headers) {
        // 不需要全局提示
        globalMsg = response.config.headers.globalMsg;
      }

      // 判断是否全局提示
      if (globalMsg !== false) {
        // 全局提示
        $message.warning(data.message);
      }
    }
  },
  httpError: (error) => {
    let globalErrorMsg = true;

    if (error.config && error.config.headers) {
      // 不需要全局提示
      globalErrorMsg = error.config.headers.globalErrorMsg;
    }

    if (error === undefined || error.code === 'ECONNABORTED') {
      // 判断是否全局提示
      if (globalErrorMsg !== false) {
        $message.error('服务请求超时');
      }
      return;
    }

    const { response: { status, statusText, data: { msg = '服务器发生错误' } } } = error;

    const text = codeMessage[status] || statusText || msg;
    // const info = response.data
    // 401不弹窗提示
    if (status == 401) {
      console.error(`${status}:${text}`);
    } else {
    // 判断是否全局提示
      if (globalErrorMsg !== false) {
        $message.error(`${status}:${text}`);
      }
    }
    // // throw error
    // // return error
    // return Promise.reject(error);
  }
});
