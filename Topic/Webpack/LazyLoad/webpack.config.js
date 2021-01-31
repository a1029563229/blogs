const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackChain = require("webpack-chain");

// 使用 webpack chain 组装配置
const chain = new WebpackChain();

// 设置入口文件为 src/index.js
chain.entry("main").add("./src/index.js").end();

// 将构建生成的文件输出到 dist 目录
chain.output.path(path.resolve(__dirname, "./dist")).end();

// 添加 html-webpack-plugin 插件，设置 HTML 模板文件
chain.plugin("html-webpack-plugin").use(HtmlWebpackPlugin, [{
  template: path.resolve(__dirname, "./index.html")
}]);

// 设置 source map 生成规则
chain.devtool("cheap-source-map").end();

// 将配置转成 webpack 可识别的配置对象
const config = chain.toConfig();

module.exports = config;