const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
	context: path.resolve(__dirname, "../"),
	entry: {
		main: {
			import: "/src/main.js", //
			filename: "main.js", // 输出文件名
			dependOn: "lodash", // 当前入口所依赖的入口。它们必须在该入口被加载前被加载 loadsh。
		},
		lodash: "lodash"
	},
	// 插件配置
	plugins: [
		// 输出HTML文件
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../src/index.html"),// 输出的html文件中包含的入口文件
			templateParameters: {
				title: "webpack打包测试",
			},
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
                  require('autoprefixer')({
                    grid: true,
                    overrideBrowserslist: ['> 1%', 'last 2 versions']
                  })
                ]
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
                  require('autoprefixer')({
                    grid: true,
                    overrideBrowserslist: ['> 1%', 'last 2 versions']
                  })
                ]
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
				test: /inline\/.*/,
				type: 'asset/source',
        generator: {
          encoding: 'utf8'
        },
				// use:{
				// 	loader: 'raw-loader',
				// 	options: {
				// 		esModule: false,
				// 	}
				// }
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
	resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
	externals: {
		myVue: "Vue",
	},
}
