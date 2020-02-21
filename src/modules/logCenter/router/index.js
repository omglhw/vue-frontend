
const router = (Layout) => ({
  path: '/log-center',
  component: Layout,
  redirect: '/log-center/login-log',
  meta: {
    isView: 'OperationCenter.Homepage.view'
  },
  children: [
    {
      path: 'login-log',
      name: 'loginLog',
      component: () => import(/* webpackChunkName: "logCenter" */ '../views'),
      meta: {
        title: '登录日志',
        // 选中tab
        selectedTab: 'login-log',
        selectedMenu: ['Logcenter'],
      },

    },
    {
      path: 'access-log',
      name: 'accessLog',
      component: () => import(/* webpackChunkName: "logCenter" */ '../views'),
      meta: {
        title: '点击日志',
        // 选中tab
        selectedTab: 'access-log',
        selectedMenu: ['Logcenter'],
      },
    },
    {
      path: 'change-log',
      name: 'changeLog',
      component: () => import(/* webpackChunkName: "logCenter" */ '../views'),
      meta: {
        title: '操作日志',
        // 选中tab
        selectedTab: 'change-log',
        selectedMenu: ['Logcenter'],
      },
    },

  ]

});
export default router;
