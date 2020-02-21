import config from '@/config';
export default {
  // 获取登录日志数据接口
  getLoginLogList: config.logCenterApi + '/m/logCenter/log/get-list',
};
