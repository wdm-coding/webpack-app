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
    publicPath:'/', // 打包后文件的访问路径
    chunkFilename:'chunk.[contenthash].js', // 异步引入的js文件命名规则
    // library: { // 打包后的库配置
    //   name:'wdm',
    //   type: 'umd' // 打包后的库暴露方式
    // }
  },
  // 源代码映射
  devtool: 'eval-cheap-module-source-map',
  // 开发服务器
  devServer: {
    client:{ // 客户端配置
      overlay: false, // 当出现编译错误或警告时，在浏览器中不显示全屏覆盖。
      progress: false, // 在浏览器控制台显示编译进度
    },
    compress: true, // 启用gzip压缩
    host:'localhost', // 主机名
    hot: true, // 开启热更新
    open: true, // 启动后自动打开浏览器
    port: 8082, // 设置端口号
    proxy:{// 代理配置


    }
  }
});
