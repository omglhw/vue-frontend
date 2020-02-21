import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // console.log(modules, modulePath);
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

// 获取src/modules下面的store
const extendModulesFiles = require.context('../modules', true, /\.*store\/.*\.js$/);

const extendModules = extendModulesFiles.keys().reduce((modules, modulePath) => {
  // 匹配modules/x0/store/x1/xx2 -> x0/x1/x2
  // 如：modules/homePageManage/store/a/b/banner.js -> homePageManage/a/b/banner
  const moduleName = modulePath.replace(/^\.\/(.*)\/store\/(.*)\.\w+$/, '$1/$2');
  const value = extendModulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  modules: {
    ...modules,
    ...extendModules
  }
});
