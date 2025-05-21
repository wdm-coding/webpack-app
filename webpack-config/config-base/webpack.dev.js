const webpackCommonConf = require('./webpack.common');
const {merge} = require('webpack-merge');
module.exports = merge(webpackCommonConf,{
  // 开发模式配置
  mode: 'development',
  // 开发服务器
  devServer: {
    static: './dist',
    hot: true
  },
});

