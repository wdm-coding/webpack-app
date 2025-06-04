const path = require('path');
const webpackCommonConf = require('./webpack.common');
const {merge} = require('webpack-merge');
module.exports = merge(webpackCommonConf,{
  // 开发模式配置
  mode: 'development',
  // 输出配置
  output: {
    filename: '[name].[contenthash].js',// 打包后的文件名，使用contenthash防止缓存问题
    path: path.resolve(__dirname, '../dev-dist'), // 打包后的目录
    clean: true, // 打包前清理/dist文件夹
    publicPath:'/' // 打包后文件的访问路径
  },
  // 开发服务器
  devServer: {
    static: './dist',
    hot: true
  }
});
