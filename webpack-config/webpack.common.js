const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  context: path.resolve(__dirname, '../'),
  // 入口文件
  // entry: ['/src/main.js','/src/two.js'],
  entry:{
    main:{
      import:'/src/main.js',// 
      filename:'main.js',// 输出文件名
      dependOn:'lodash' // 当前入口所依赖的入口。它们必须在该入口被加载前被加载 loadsh。
    },
    lodash:'lodash',
    two:{
      import:'/src/two.js',
      filename:'test.js'
    }
  },
  // 插件配置
  plugins: [
    // 输出HTML文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    })
  ],
  // 模块处理规则
  module: {
    rules: [
      // CSS处理
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};