import Vue from 'vue';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css'; // progress bar style
import { removeAuthParameter } from '@/utils';

// NProgress.configure({
//   showSpinner: false
// });

// 监听获取到token后再进入vue页面
const watchTokenToNext = (to, from, next) => {
  // $eventBus在 @yl/vue-saas-layout中实现
  // baseDataReady基础数据就绪 比如用户信息和权限列表
  const $eventBus = Vue.prototype.$eventBus;
  $eventBus.$on('baseDataReady', (userInfo) => {
    if (userInfo) {
      // 删除ticket,sid,o后的参数
      let toQuery = removeAuthParameter(JSON.parse(JSON.stringify(to.query)));

      next({
        path: to.path,
        query: toQuery
      });
    }
  });
};

const permissionNext = (to, from, next, redirect) => {
  if (to.meta.isView) {
    const isView = Vue.prototype.$utils.hasAuth(to.meta.isView);
    if (!isView) {
      next('/error/403');
      return;
    }
  }
  if (redirect) {
    next(redirect);
    return;
  }
  next();
};

// 携带url参数
const carryUrlParam = (to, from) => {
  let toQuery = JSON.parse(JSON.stringify(to.query));
  let isChange = false;
  if (!to.query._ac && from.query._ac) {
    isChange = true;
    // 参数_ac带到下一个路由
    toQuery._ac = from.query._ac;
  }
  if (!to.query._smp && from.query._smp) {
    isChange = true;
    // 参数_smp带到下一个路由
    toQuery._smp = from.query._smp;
  }
  if (!to.query['hide-layout'] && from.query['hide-layout']) {
    isChange = true;
    // 参数hide-layout带到下一个路由
    toQuery['hide-layout'] = from.query['hide-layout'];
  }

  return isChange ? toQuery : '';
};

export default (router) => {
  router.beforeEach((to, from, next) => {
    // start progress bar
    // NProgress.start();

    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }

    // isReady:基础用户数据加载完成
    if (Vue.prototype.$utils.isReady) {
      const toQuery = carryUrlParam(to, from);
      if (toQuery) {
        permissionNext(to, from, next, {
          path: to.path,
          query: toQuery
        });
      } else {
        permissionNext(to, from, next);
      }
    } else {
      // 监听获取到token后再进入vue页面
      watchTokenToNext(to, from, next);
    }
  });

  router.afterEach((to, from) => {
    // finish progress bar
    // 统一给vue实现的$utils加上appCode
    Vue.prototype.$utils.appCode = to.query._ac;

    const fromAppCode = from.query._ac;
    const toAppCode = to.query._ac;
    if (fromAppCode && toAppCode != fromAppCode) {
      // 更新左侧菜单
      const $eventBus = Vue.prototype.$eventBus;
      $eventBus.$emit('updateLeftMenu');
    }

    // 记录一次访问
    const monitor = Vue.prototype.$monitor;
    if (monitor) {
      monitor.trackView({
        operatePoint: to.meta.title
      });
    }
    // NProgress.done();
  });
};
