const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

const { appSrc, appBuild, appPath, appHtml } = require("./paths");
const baseConfig = require("./webpack.base");

const ASSETS_PATH = process.env.ASSETS_PATH;

const VENDORS = ["react", "react-dom"];

const productionConfig = {
  mode: "production",
  entry: {
    app: `${appSrc}/index.tsx`,
    vendors: VENDORS,
  },

  output: {
    path: appBuild,
    filename: "[name]-[hash:8].js",
    chunkFilename: "[name]-[chunkhash:8].js",
    publicPath: ASSETS_PATH,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          name: "vendors",
          priority: 10,
          enforce: true,
        },
        style: {
          test: /\.css$/,
          name: "style",
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      title: "React App",
      template: appHtml,
      favicon: path.join(appPath, "/favicon.ico"),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash:5].css",
      chunkFilename: "[id]-[chunkhash:5].css",
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};

module.exports = merge(productionConfig, baseConfig);
