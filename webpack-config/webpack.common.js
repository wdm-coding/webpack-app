const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
      templateParameters:{
        title:'webpack打包测试'
      }
    })
  ],
  // 优化配置
  optimization:{
    minimizer:[
      new CssMinimizerPlugin({
        test: /\.css$/, // 匹配输出的css文件
        minify: CssMinimizerPlugin.cssnanoMinify, // 使用cssnano压缩css文件
        parallel: true, // 并行压缩
        minimizerOptions: {
          preset: [
            'default',
            { 
              discardComments: {  // 移除注释
                removeAll: true // 移除所有注释
              } 
            }
          ]
        }
      }) // 压缩css文件
    ]
  },
  // 模块处理规则
  module: {
    rules: [
      // CSS处理
      {
        test: /\.css$/, // 正则匹配文件类型
        use: ['style-loader', 'css-loader' ] // 处理顺序：从右往左。 必须先执行css-loader
      },
      // SCSS处理
      {
        test: /\.scss$/, // 正则匹配文件类型
        use: ['style-loader', 'css-loader', 'sass-loader' ] // 处理顺序：从右往左。 必须先执行sass-loader
      },
      // es6语法处理
      {
        test: /\.js$/, // 匹配.js文件
        exclude: /node_modules/, // 排除node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 使用默认配置
            cacheDirectory: true // 缓存编译结果 加快编译速度
          }
        }
      },
    ]
  }
};