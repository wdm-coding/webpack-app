const path = require('path');
const webpackCommonConf = require('./webpack.common');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = merge(webpackCommonConf,{
  // 生产模式配置
  mode: 'production',
  // 源代码映射
  devtool: 'hidden-nosources-source-map',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, '../prod-dist'),
    clean: true,
    sourceMapFilename: '[name].[contenthash].map' // map文件也加哈希
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // 入口chunk的css文件命名
      chunkFilename: '[id].[contenthash].css' // 非入口chunk的css文件命名(异步引入的css文件命名)
    }),
  ],
  // 模块处理规则
  module: {
    rules: [
      // CSS处理
      {
        test: /\.css$/, // 正则匹配文件类型
        use: [MiniCssExtractPlugin.loader, 'css-loader' ] // 处理顺序：从右往左。 必须先执行css-loader
      },
      // SCSS处理
      {
        test: /\.scss$/, // 正则匹配文件类型
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ] // 处理顺序：从右往左。 必须先执行sass-loader
      }
    ]
  }
});