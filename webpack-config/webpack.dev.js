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
    chunkFilename:'chunk.[contenthash].js', // 异步引入的js文件命名规则
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
    hot: true, // 开启热更新
    open: false, // 启动后自动打开浏览器
    port: 8082, // 设置端口号
    proxy: [{
      context: ['/api'], // 需要代理的路径
      target: 'http://localhost:8081', // 目标地址
      changeOrigin: true, // 开启代理，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样就不会有跨域问题
      pathRewrite: { '^/api': '' }, // 重写路径
      secure: false, // 如果是https接口，需要配置这个参数
      logLevel: 'debug' // 日志级别
    }]
  }
});
