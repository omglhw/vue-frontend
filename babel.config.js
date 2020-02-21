const plugins = [];

if (process.env.VUE_APP_ENV === 'production') {
  // 生产环境移除console.log  保留error和warn
  plugins.push(['transform-remove-console', { 'exclude': ['error', 'warn'] }]);
}
module.exports = {
  presets: [[
    '@vue/app',
    {
      'useBuiltIns': 'entry'
    }
  ]],
  'plugins': [
    // 'syntax-dynamic-import',
    // element-ui引入改为cdn方式，以下注销
    // [
    //   'component',
    //   {
    //     'libraryName': 'element-ui',
    //     'styleLibraryName': '~node_modules/@yl/vue-saas-layout/theme/'
    //   }
    // ],
    'lodash',
    ...plugins
  ]
};
