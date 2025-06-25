const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
module.exports = () => {
	const context = path.resolve(__dirname, "../webpack-app/")
	console.log('context:', context)
	const config = {
		// 文件路径配置
		context,
		// 模式配置
		mode:'development',
		// 入口配置
		entry: {
			main: {
				import: path.resolve(context, "src/main.js"), // 修正后的入口路径
				filename: "main.js", // 输出文件名
			},
		},
		// 输出配置
		output: {
			filename: "[name].[contenthash].js", // 打包后的文件名，使用contenthash防止缓存问题
			path: path.resolve(__dirname, "../dist"), // 打包后的目录
			clean: true, // 打包前清理/dist文件夹
			chunkFilename: "chunk.[contenthash].js", // 异步引入的js文件命名规则
		},
		// 插件配置
		plugins: [
			// 输出HTML文件
			new HtmlWebpackPlugin({
				template: path.resolve(context, "src/index.html"), // 输出的html文件中包含的入口文件
			}),
			new MiniCssExtractPlugin({
				filename: "[name].[contenthash].css",
				chunkFilename: "[id].css",
			}),
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
						},
					},
				}),
			],
			splitChunks: {
				chunks: 'all',
				minSize: 20000, // 降低到 20KB (原配置 200KB 太大)
				maxSize: 244000, // 244KB (等于警告值)
				minChunks: 1,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
						priority: 10, // 提高优先级
					}
				}
			}
		},
		// 模块处理规则
		module: {
			rules: [
				// CSS处理
				{
					test: /\.css$/, // 正则匹配文件类型
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [
										require("autoprefixer")({
											grid: true,
											overrideBrowserslist: ["> 1%", "last 2 versions"],
										}),
									],
								},
							},
						},
					], // 处理顺序：从右往左。 必须先执行css-loader
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
										require("autoprefixer")({
											// 自动补全css3前缀
											grid: true,
											overrideBrowserslist: ["> 1%", "last 2 versions"],
										}),
									],
								},
							},
						},
						"sass-loader",
					], // 处理顺序：从右往左。 必须先执行sass-loader
				},
				// es6语法处理
				{
					test: /\.js$/, // 匹配.js文件
					exclude: /node_modules/, // 排除node_modules
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"], // 使用默认配置
							cacheDirectory: true, // 缓存编译结果 加快编译速度
						},
					},
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: "asset",
					parser: {
						dataUrlCondition: {
							maxSize: 8 * 1024, // 小于8kb的图片会被转成base64编码，否则会生成单独的文件
						},
					},
				},
			],
		},
		resolve: {
			alias: {
				 "@": path.resolve(__dirname, "../src"), // 添加上一级目录
			},
		},
		// 源代码映射
		devtool: "eval-cheap-module-source-map",
		// 开发服务器
		devServer: {
			client: {
				// 客户端配置
				overlay: false, // 当出现编译错误或警告时，在浏览器中不显示全屏覆盖。
				progress: false, // 在浏览器控制台显示编译进度
			},
			compress: true, // 启用gzip压缩
			hot: true, // 开启热更新
			open: false, // 启动后自动打开浏览器
			port: 8082, // 设置端口号
			proxy: [
				{
					context: ["/api"], // 需要代理的路径
					target: "http://localhost:8081", // 目标地址
					changeOrigin: true, // 开启代理，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样就不会有跨域问题
					pathRewrite: { "^/api": "" }, // 重写路径
					secure: false, // 如果是https接口，需要配置这个参数
					logLevel: "debug", // 日志级别
				},
			],
		},
	}
	return config
}
