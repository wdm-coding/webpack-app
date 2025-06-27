const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const mock = require('./src/mock/index');
module.exports = {
	// 开发模式，默认值为production
	mode:'development',
	// 入口文件配置
	entry: "./src/main.js",	
	// 出口配置
	output: {
		path: path.resolve(__dirname, "dist"), // 输出目录
		filename: "[name].js", // 输出的文件名，默认为main.js
		clean: true, // 每次打包前清理之前的文件
	},
	resolve: {
		// 添加自动识别的后缀列表
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
	// 模块处理规则
	module: {
		rules: [
			// CSS处理
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader", // 使用postcss-loader处理CSS文件，并配置autoprefixer插件自动添加浏览器前缀
						options: {
							postcssOptions: {
								plugins: [
                  require('autoprefixer')({
                    grid: true,
                    overrideBrowserslist: ['> 1%', 'last 2 versions']
                  })
                ]
							},
						},
					},
				],
			},
			// SCSS处理
			{
				test: /\.scss$/, // 正则匹配文件类型
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
                  require('autoprefixer')({
                    grid: true,
                    overrideBrowserslist: ['> 1%', 'last 2 versions']
                  })
                ]
							},
						},
					},
					"sass-loader",
				],
			},
			// es6语法处理
			{
				test: /\.jsx?$/, // 匹配.js.,jsx文件
				exclude: /node_modules/, // 排除node_modules
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							["@babel/preset-env",{
								useBuiltIns: 'usage', // 按需加载polyfill
								corejs: 3, // 使用core-js的版本为3
							}],
							["@babel/preset-react"]
						], // 使用默认配置
						plugins: ['@babel/plugin-transform-runtime','@babel/plugin-transform-modules-commonjs'],// 插件列表
						cacheDirectory: true, // 缓存编译结果 加快编译速度
					},
				},
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 小于8kb的图片会被转成base64编码，否则会生成单独的文件
          }
        },
			}
		],
	},
	// 插件配置
	plugins: [
		new CleanWebpackPlugin(),
		// 输出HTML文件
		new HtmlWebpackPlugin({
			template: "./src/index.html",// 输出的html文件中包含的入口文件
		}),
		new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    })
	],
	// 优化配置
	optimization: {
		minimizer: [
			// 压缩css文件
			new CssMinimizerPlugin({
				test: /\.css$/, // 匹配输出的css文件
				minify: CssMinimizerPlugin.cssnanoMinify, // 使用cssnano压缩css文件
				parallel: true, // 并行压缩
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: {
								// 移除注释
								removeAll: true, // 移除所有注释
							},
						},
					],
				},
			}), 
			// 移除console语句
			new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 移除所有console
            // 或者指定要移除的console类型
            // drop_console: ['log', 'info', 'warn', 'error'] 
          },
        },
      }),
		],
		splitChunks:{
			chunks:'all', // 分割代码块的方式，可选值：all、async、initial和none。默认为async
			minChunks:1, // 最少被引用1次就会被打包进公共模块中
			minSize:200000, // 打包后的模块大小超过200kb就会被单独打包成一个文件
		}
	},
  // 源代码映射
  devtool: 'eval-cheap-module-source-map',
  // 开发服务器
  devServer: {
		devMiddleware: {
			writeToDisk: true, // 打包后的文件写入磁盘
		},
    client:{ // 客户端配置
      overlay: false, // 当出现编译错误或警告时，在浏览器中不显示全屏覆盖。
      progress: false, // 在浏览器控制台显示编译进度
    },
    compress: true, // 启用gzip压缩
    hot: true, // 开启热更新
    open: false, // 启动后自动打开浏览器
    port: 8082, // 设置端口号
		setupMiddlewares: function(middlewares, devServer) {
			mock(devServer.app)
			return middlewares;
		},
    proxy: [{
      context: ['/api'], // 需要代理的路径
      target: 'http://localhost:8081', // 目标地址
      changeOrigin: true, // 开启代理，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样就不会有跨域问题
      pathRewrite: { '^/api': '' }, // 重写路径
      secure: false, // 如果是https接口，需要配置这个参数
      logLevel: 'debug' // 日志级别
    }]
  }
}
