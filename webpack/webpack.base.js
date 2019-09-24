const { getAlias } = require("./paths");

const tsImportPluginFactory = require("ts-import-plugin");
const createStyledComponentsTransformer = require("typescript-plugin-styled-components").default;
const autoprefixer = require("autoprefixer");
const PostcssFlexBugsFixes = require("postcss-flexbugs-fixes");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const TEST = process.env.TEST;
const LOCAL = process.env.LOCAL;
const NODE_ENV = process.env.NODE_ENV;

const address = {};

Object.keys(process.address).forEach((v) => {
  address[v] = JSON.stringify(process.address[v]);
});

const definitions = {
  "process.env": {
    NODE_ENV: JSON.stringify(NODE_ENV),
    TEST: TEST,
    LOCAL: LOCAL,
  },
  "process.address": address,
};

module.exports = {
  resolve: {
    extensions: [".ts", ".json", ".tsx", ".js"],
    alias: getAlias(),
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.ts[x]?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: "antd",
                libraryDirectory: "es",
                style: (name) => `${name}/style/css.js`,
              }),
              createStyledComponentsTransformer({
                displayName: true,
                minify: true,
              }),
            ],
          }),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
            },
          },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
              sourceMap: true,
              localIdentName: "[local]",
            },
          },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [
                PostcssFlexBugsFixes,
                autoprefixer({
                  flexbox: "no-2009",
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "[name].[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [new webpack.DefinePlugin(definitions)],
};
