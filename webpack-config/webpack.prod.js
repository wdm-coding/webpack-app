const path = require("path")
const webpackCommonConf = require("./webpack.common")
const { merge } = require("webpack-merge")
module.exports = merge(webpackCommonConf, {
	// 生产模式配置
	mode: "production",
	// 源代码映射
	devtool: "hidden-nosources-source-map",
	output: {
		filename: "bundle.[contenthash].js",
		path: path.resolve(__dirname, "../prod-dist"),
		clean: true,
		sourceMapFilename: "[name].[contenthash].map", // map文件也加哈希
	},
})
