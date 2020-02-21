// babel polyfill放在最前端
import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';

import '@/plugins/elementui.js';
import '@/plugins/vueSaasLayout.js';
import '@/plugins/tippy.js';
import '@/assets/style/global.scss';
import '@/assets/font/iconfont/iconfont.css';
// permission control
import permission from '@/router/permission';
// 分页
import '@/mixins/pagination';

import '@/mixins/module';

import { APIS } from '@/api';
// 日志
import '@/plugins/monitor.js';

if (process.env.NODE_ENV === 'development') {
  // 开启vue.devtools
  Vue.config.devtools = true;
}

Vue.config.productionTip = false;

Vue.prototype.APIS = APIS;

export default ({ router, store }) => {
  permission(router);
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
};
