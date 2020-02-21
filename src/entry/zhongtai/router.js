import Vue from 'vue';
import Router from 'vue-router';
// import Home from '@/views/Home.vue';
import {
  Layout
} from '@yl/vue-saas-layout';

import CleanLayout from '@/views/layout';

// demo
import demo from '@/router/modules/demo';

// 日志中心
import { router as logCenter } from '@/modules/logCenter';

// https://github.com/vuejs/vue-router/issues/2873
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

// Vue.use(layout);

const createRouter = () => new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      children: [{
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        name: 'home',
        meta: {
          title: 'vue前端'
        }
      }]

    },
    // 场景：http://localhost:8080/?a=2#/workflow/approval/setting/add-template&sid=c7c257c1a0d5c6216f3b5f5e6709686f2eb5bf2c%20&ticket=1565092191pzkQlY&o=retesting
    // 注hash后面没有问号,这是由于后端直接拼接到url后面，没有考虑存在hash
    { path: '*&sid=*',
      redirect: to => {
        return to.params.pathMatch;
      }
    },
    { path: '/error',
      component: Layout,
      children: [{
        path: '404',
        component: () => import(/* webpackChunkName: "error" */ '@/views/error/404.vue'),
        name: '找不到页面',
        meta: {
          title: '找不到页面'
        }
      },
      {
        path: '403',
        component: () => import(/* webpackChunkName: "error" */ '@/views/error/403.vue'),
        name: '没权限',
        meta: {
          title: '没权限'
        }
      }] },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    demo(Layout),

    logCenter(Layout),
    // 把`/bms/${tenantCode}`截取掉，重定向
    { path: '/bms/:tenantCode?/*',
      redirect: to => {
        return to.params.pathMatch;
      } },
    { path: '*', redirect: '/error/404' }
  ],
});

const router = createRouter();
// ie 11 hash 地址栏路由不跳转
if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
  window.addEventListener('hashchange', () => {
    var currentPath = window.location.hash.slice(1);
    if (router.path !== currentPath) {
      router.push(currentPath);
    }
  }, false);
}
export default router;
