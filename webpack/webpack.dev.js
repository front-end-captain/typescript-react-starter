const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const merge = require("webpack-merge");

const { appSrc, appBuild, appPath, appHtml } = require("./paths");
const baseConfig = require("./webpack.base");

const ASSETS_PATH = process.address.ASSETS_PATH;

const developmentConfig = {
  devtool: "cheap-module-source-map",

  mode: "development",

  entry: {
    app: ["react-hot-loader/patch", `${appSrc}/index.tsx`],
  },

  output: {
    path: appBuild,
    filename: "[name]-[hash:8].js",
    sourceMapFilename: "[name].[hash:8]-map.js",
    publicPath: ASSETS_PATH,
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts[x]$/,
        loader: "source-map-loader",
      },
    ],
  },

  plugins: [
    new ErrorOverlayPlugin(),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      title: "React App",
      template: appHtml,
      favicon: path.join(appPath, "/favicon.ico"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.NamedModulesPlugin(),
    new HotModuleReplacementPlugin(),
  ],
};

module.exports = merge(developmentConfig, baseConfig);
