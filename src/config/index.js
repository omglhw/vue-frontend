const config = {
  app: process.env.VUE_APP_APPLICATION,
  // 登录
  loginURL: process.env.VUE_APP_LOGINURL,
  // 基础框架
  baseApi: process.env.VUE_APP_BASEURL,
  // 报表中心
  reportApi: process.env.VUE_APP_ENV == 'production' ? process.env.VUE_APP_REPORTURL : process.env.VUE_APP_BASEURL,
  // 审批工作流
  workflowApi: process.env.VUE_APP_WORKFLOWURL,
  // publicData
  publicDataApi: process.env.VUE_APP_PUBLICDATAURL,
  // organization
  organizationApi: process.env.VUE_APP_ORGANIZATIONURL,
  // 首页管理
  homePageManageApi: process.env.VUE_APP_BASEURL,
  // 日志中心
  logCenterApi: process.env.VUE_APP_LOGCENTERURL,
  // 分页数
  pageSize: 20,
  // 是否请求头部(注，此设置仅设置是否请求头部接口)
  showTopNavs: !['mg'].includes(process.env.VUE_APP_APPLICATION),
  // 是否请求左侧菜单(同上)
  showLeftMenus: !['mg'].includes(process.env.VUE_APP_APPLICATION),
  // 是否启用日志
  enableLog: ['mg', 'saas'].includes(process.env.VUE_APP_APPLICATION),
  // 数据级别类型
  levelType: [
    {
      value: 1,
      code: 'GROUP',
      name: '集团'
    },
    {
      value: 2,
      code: 'COMPANY',
      name: '公司'
    },
    {
      value: 3,
      code: 'PROJECT',
      name: '项目'
    }
  ],
  // 组织类型
  orgType: [
    {
      value: 1,
      code: 'GROUP',
      name: '集团'
    },
    {
      value: 2,
      code: 'COMPANY',
      name: '公司'
    },
    {
      value: 3,
      code: 'DEPARTMENT',
      name: '部门'
    }
  ],

};

let globalConfig = {};
if (window.siteConfig) {
  globalConfig = window.siteConfig;
}
// 合并全局配置
export default { ...config, ...globalConfig };
