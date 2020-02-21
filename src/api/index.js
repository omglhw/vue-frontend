// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/);
// you do not need `import app from './modules/app'`

const APIS = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export {
  APIS
};
