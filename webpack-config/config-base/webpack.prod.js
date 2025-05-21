const webpackCommonConf = require('./webpack.common');
const {merge} = require('webpack-merge');
module.exports = merge(webpackCommonConf,{
  // 生产模式配置
  mode: 'production',
  build: {
    // 打包后的文件目录
    path: 'dist',
  },
});
