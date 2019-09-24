"use strict";

const path = require("path");
const config = require("./webpack.dev");
const paths = require("./paths");

const protocol = process.env.HTTPS === "true" ? "https" : "http";
const host = process.env.HOST || "0.0.0.0";

module.exports = function(proxy, allowedHost) {
  return {
    disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
    compress: true,
    clientLogLevel: "none",
    contentBase: paths.appBuild,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    stats: 'errors-only',
    quiet: true,
    watchOptions: {
      ignored: new RegExp(
        `^(?!${path.normalize(paths.appSrc + "/").replace(/[\\]+/g, "\\\\")}).+[\\\\/]node_modules[\\\\/]`,
        "g",
      ),
    },
    https: protocol === "https",
    host: host,
    overlay: {
      warnings: false,
      errors: true,
    },
    historyApiFallback: {
      index: `${config.output.publicPath}index.html`,
    },
    public: allowedHost,
    proxy,
  };
};
