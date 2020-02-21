import Vue from 'vue';
import { Monitor } from '@yl/monitor';
import { APIS } from '@/api';
import config from '@/config';

const monitor = new Monitor({
  enable: config.enableLog,
  url: APIS.LogCenter.writeLog,
  http: Vue.$http,
});

Vue.prototype.$monitor = monitor;
