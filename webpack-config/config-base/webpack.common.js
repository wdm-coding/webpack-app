const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件
  entry: './src/main.js',
  // 输出配置
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  // 模块处理规则
  module: {
    rules: [
      // CSS处理
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      // 图片资源处理
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  // 插件配置
  plugins: [
    // 输出HTML文件
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
