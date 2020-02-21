const CompressionWebpackPlugin = require('compression-webpack-plugin');
// mock数据
const mock = require('./mock/index.js');
const path = require('path');
process.env.VUE_APP_VERSION = require('./package.json').version;

// 入口
const entry = {
  // saas
  'saas': 'src/entry/saas/index.js',
  // mg: 中台版
  'mg': 'src/entry/zhongtai/index.js',
};
module.exports = {
  outputDir: process.env.outputDir,

  //  vue-saas-layout是ES6以上版本撰写，需要polyfill
  //  正则 .*?vue-saas-layout.* => '_@yl_vue-saas-layout@1.1.0@@yl'
  transpileDependencies: ['.*?vue-saas-layout.*'],

  chainWebpack: config => {
    // 移除 prefetch 插件
    const entryName = 'index';
    config.plugins.delete(`prefetch-${entryName}`);
    // prefetch黑名单 ,不常用的都可以加入黑名单
    // const entryNames = ['index']; // pages
    // entryNames.forEach(entryName => {
    //   config.plugin(`prefetch-${entryName}`).tap(options => {
    //     if (options.length > 0) {
    //       options[0].fileBlacklist = options[0].fileBlacklist || [];
    //       // map文件不需要prefetch
    //       options[0].fileBlacklist.push(/\.map/);
    //       // demo不需要prefetch
    //       options[0].fileBlacklist.push(/demo(.)+?\.(js|css)$/);
    //       //
    //       options[0].fileBlacklist.push(/error(.)+?\.(js|css)$/);
    //     }
    //     return options;
    //   });
    // });

    // config.optimization.splitChunks({
    //   chunks: 'all'
    // });
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      const plugins = [];

      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8,
          // deleteOriginalAssets: true // 删除原文件
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ];
    }
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    };
  },

  devServer: {
    disableHostCheck: true,
    before: mock,
    proxy: {
      '/baseApi': {
        // target: 'https://cg-test.sizename.com',
        target: 'https://app-test.sizename.com',
        pathRewrite: {
          '^/baseApi': ''
          // '^/baseapi': 'yarn'
        }
      },
      '/workflowApi': {
        target: 'https://app-test.sizename.com',
        pathRewrite: {
          '^/workflowApi': 'liuj22'
        }
      },
      '/publicDataApi': {
        target: 'https://app-test.sizename.com',
        pathRewrite: {
          '^/publicDataApi': 'liuj22'
        }
      },
      '/organizationApi': {
        target: 'https://app-test.sizename.com',
        pathRewrite: {
          '^/organizationApi': 'liuj22'
        }
      },
      '/reportApi': {
        target: 'https://app-test.sizename.com',
        pathRewrite: {
          '^/reportApi': ''
          // '^/baseapi': 'yangh04'
        }
      },

    }
  },

  pages: {
    index: {
      // page 的入口
      entry: entry[process.env.VUE_APP_APPLICATION || 'saas']
    },
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [ path.resolve(__dirname, './src/assets/style/variables.scss') ]
    }
  }
};
