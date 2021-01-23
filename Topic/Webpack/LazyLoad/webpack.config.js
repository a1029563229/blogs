const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackChain = require("webpack-chain");

const chain = new WebpackChain();

chain.entry("main").add("./src/index.js").end();
chain.output.path(path.resolve(__dirname, "./dist")).end();
chain.plugin("html-webpack-plugin").use(HtmlWebpackPlugin, [{
  template: path.resolve(__dirname, "./index.html")
}]);
chain.devtool("cheap-source-map").end();

const config = chain.toConfig();
console.log(config);

module.exports = config;